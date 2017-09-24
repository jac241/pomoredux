class Api::TimerSettingsController < ApiController
  before_action :authenticate_api_user!

  def update
    results =
      UpdateTimerSettingsService.new.call(
        user: current_api_user, update_params: update_params)

    render json: results.timer_settings, status: :ok
  end

  def show
    timer_settings = current_api_user.timer_settings

    render json: timer_settings
  end

  private

  def update_params
    params.require(:timer_setting).permit(
      :pomodoro_length_in_min,
      :short_break_length_in_min,
      :long_break_length_in_min
    )
  end
end
