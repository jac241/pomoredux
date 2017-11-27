class Api::SessionsController < Devise::SessionsController
  include CustomInvalidCsrfResponse

  def create
    self.resource = warden.authenticate(auth_options)

    respond_to do |format|
      if resource
        sign_in(resource_name, resource)
        format.json { render json: resource, status: :created }
      else
        warden.custom_failure!
        format.json { head :unauthorized }
      end
    end
  end

  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?

    # return the new CSRF token because session that contains token destroy
    # https://stackoverflow.com/questions/11845500/rails-devise-authentication-csrf-issue

    respond_to do |format|
      format.json do
        render json: {
          csrf_param: request_forgery_protection_token,
          csrf_token: form_authenticity_token
        }
      end
    end
  end
end
