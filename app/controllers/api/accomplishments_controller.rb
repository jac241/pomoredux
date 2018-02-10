class Api::AccomplishmentsController < ApiController
  before_action :authenticate_api_user!
  deserializable_resource :accomplishment

  def create
    goal = current_api_user.goals.find(create_params[:goal_id])
    accomplishment = goal.accomplishments.new

    if accomplishment.save
      render jsonapi: accomplishment, include: [:goal]
    end
  end

  private

  def create_params
    params.require(:accomplishment).permit(:goal_id)
  end
end
