class Api::UsersController < ApiController
  before_action :authenticate_api_user!

  def show
    if current_api_user
      head :no_content
    else
      head :unauthorized
    end
  end
end
