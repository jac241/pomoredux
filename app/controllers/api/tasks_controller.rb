class Api::TasksController < ApiController
  before_action :authenticate_api_user!

  def create
    result = CreateTaskService.call(
      user: current_api_user,
      create_params: create_params
    )

    result.on(:created) { |task| render json: task, status: :created }
  end

  private

  def create_params
    params.permit(:title, :estimated_num_pomodoros)
  end
end
