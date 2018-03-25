class Api::AccomplishmentsController < ApiController
  before_action :authenticate_api_user!
  deserializable_resource :accomplishment, only: [:create]

  def create
    goal = current_api_user.goals.find(create_params[:goal_id])
    accomplishment = goal.accomplishments.new

    if accomplishment.save
      render jsonapi: accomplishment, include: [goal: [:todays_accomplishment]]
    end
  end

  def destroy
    current_api_user.accomplishments.find(params[:id]).destroy

    head :no_content
  end

  private

  def create_params
    params.require(:accomplishment).permit(:goal_id)
  end
end
