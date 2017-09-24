class ApiController < ApplicationController
  rescue_from ActionController::InvalidAuthenticityToken,
    with: :handle_invalid_authenticity_token

  def handle_invalid_authenticity_token
    render json: { invalid_authenticity_token: true },
      status: :unprocessable_entity
  end
end
