class Api::DailyGoalsController < ApiController
  before_action :authenticate_api_user!

  def index
    render jsonapi: current_api_user.goals
  end
end