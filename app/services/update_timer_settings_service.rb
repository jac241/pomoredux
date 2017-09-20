class UpdateTimerSettingsService

  def call(user:, update_params:)
    return OpenStruct.new(
      success: user.timer_settings.update(update_params),
      timer_settings: user.timer_settings
    )
  end

  private

  attr_reader :user, :update_params
end
