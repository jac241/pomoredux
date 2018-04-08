class ApiController < ApplicationController
  include CustomInvalidCsrfResponse

  #after_action :log_json_response, if: -> { Rails.env.development? }

  private

  def log_json_response
    Rails.logger.debug(JSON.pretty_generate(JSON.parse(response.body)))
  end
end
