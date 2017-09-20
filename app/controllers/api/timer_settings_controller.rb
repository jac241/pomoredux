class Api::TimerSettingsController < ApplicationController
  before_action :authenticate_api_user!

  BUFFER_SO_THAT_59_ALWAYS_SHOWN = 100

  def update
    results =
      UpdateTimerSettingsService.new.call(
        user: current_api_user, update_params: update_params)

    render json: results.timer_settings, status: :ok
  end

  def show
    timer_settings = current_api_user.timer_settings

    render json: {
      pomodoro: timer_settings.pomodoro_length_ms,
      short_break: timer_settings.short_break_length_ms,
      long_break: timer_settings.long_break_length_ms
    }
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
