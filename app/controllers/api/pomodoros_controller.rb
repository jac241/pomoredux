class Api::PomodorosController < ApiController
  def create
    results = CreatePomodoroService.call(
      user: current_api_user,
      task_id: params[:task_id]
    )

    results.on(:created) { |pomodoro| render json: pomodoro }
  end
end
