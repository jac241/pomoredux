class Api::ExcusesController < ApiController
  before_action :authenticate_api_user!
  deserializable_resource :excuse, only: [:create]

  before_action :set_goal, only: [:create]

  def create
    excuse = @goal.excuses.new(create_params)

    excuse.save!

    render jsonapi: excuse, include: [
      daily_goal: [:todays_excuse]
    ]
  end

  private

  def create_params
    params.require(:excuse).permit(:description)
  end

  def set_goal
    @goal = current_api_user.goals.find(params.dig(:excuse, :daily_goal_id))
  end
end
