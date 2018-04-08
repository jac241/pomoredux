class Api::DailyGoalsController < ApiController
  before_action :authenticate_api_user!

  def index
    render jsonapi: DailyGoal.all_for_user(current_api_user),
      include: [:todays_accomplishment]
  end
end
