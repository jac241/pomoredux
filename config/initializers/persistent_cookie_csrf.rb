# https://gist.github.com/killthekitten/b9a7b11530c44e788a31ec53e5ef0dad

module ActionController
  module RequestForgeryProtection
    COOKIE_NAME = :_csrf_token

    def real_csrf_token(session)
      csrf_token = cookies.encrypted[COOKIE_NAME] || session[:_csrf_token]
      csrf_token ||= SecureRandom.base64(AUTHENTICITY_TOKEN_LENGTH)
      cookies.encrypted[COOKIE_NAME] ||= {
        value: csrf_token,
        expires: 1.year.from_now,
        httponly: true
      }
      session[:_csrf_token] = csrf_token
      Base64.strict_decode64(csrf_token)
    end
  end
end

Warden::Manager.after_authentication do |_record, warden, _options|
  clean_up_for_winning_strategy = !warden.winning_strategy.respond_to?(:clean_up_csrf?) ||
    warden.winning_strategy.clean_up_csrf?
  if Devise.clean_up_csrf_token_on_authentication && clean_up_for_winning_strategy
    warden.cookies.delete(ActionController::RequestForgeryProtection::COOKIE_NAME)
  end
end
