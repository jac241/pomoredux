class Api::SessionsController < Devise::SessionsController
  def create
    self.resource = User.find_for_database_authentication(email: sign_in_params[:email])

    respond_to do |format|
      if resource && resource.valid_password?(sign_in_params[:password])
        sign_in(resource_name, resource)
        format.json { render json: resource, status: :created }
      else
        warden.custom_failure!
        format.json { head :unauthorized }
      end
    end
  end

  private

  def sign_in_params
    params.require(:session).permit(:email, :password)
  end
end
