class Api::PomodorosController < ApiController
  def create
    results = CreatePomodoroService.call(
      user: current_api_user,
      task_id: params[:task_id]
    )

    results.on(:created) { |pomodoro| render json: pomodoro }
  end

  def index
    pomodoros = current_api_user.pomodoros.joins(:task).where('tasks.completed_at IS NULL')

    render json: pomodoros
  end

  private

  def index_params
    params.permit(:task_id)
  end
end
