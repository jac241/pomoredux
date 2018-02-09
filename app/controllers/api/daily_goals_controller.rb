class Api::DailyGoalsController < ApiController

  def index
    render jsonapi: Goal.all
  end
end
