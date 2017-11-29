class Api::TasksController < ApiController
  before_action :authenticate_api_user!

  def create
    results = CreateTaskService.call(
      user: current_api_user,
      create_params: create_params
    )

    results.on(:created) { |task| render json: task, status: :created }
    results.on(:invalid_params) { |task| render json: task.errors, status: :unprocessable_entity}
  end

  def index
    tasks = current_api_user.tasks

    render json: tasks
  end

  def show
    task = current_api_user.tasks.find(params[:id])

    render json: task
  end

  private

  def create_params
    params.permit(:title, :estimated_num_pomodoros)
  end
end
