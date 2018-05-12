class Api::ExcusesController < ApiController
  before_action :authenticate_api_user!
  deserializable_resource :excuse

  before_action :set_goal, only: [:create]

  def create
    excuse = @goal.excuses.new(create_params)

    excuse.save!

    render jsonapi: excuse, status: :created, include: [
      daily_goal: [:todays_excuse]
    ]
  end

  def update
    excuse = current_api_user.excuses.find(params[:id])

    excuse.update!(update_params)

    render jsonapi: excuse, include: [daily_goal: [:todays_excuse]]
  end

  private

  def create_params
    params.require(:excuse).permit(:description)
  end

  def update_params
    params.require(:excuse).permit(:description)
  end

  def set_goal
    @goal = current_api_user.goals.find(params.dig(:excuse, :daily_goal_id))
  end
end
