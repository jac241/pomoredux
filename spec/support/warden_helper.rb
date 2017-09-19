module WardenHelper

  include Warden::Test::Helpers

  def sign_in(resource)
    login_as(resource, scope: :api_user)
  end

  def sign_out(resource)
    logout(:api_user)
  end
end
