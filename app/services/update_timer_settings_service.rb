class UpdateTimerSettingsService

  def call(user:, update_params:)
    timer_settings = user.timer_settings

    return OpenStruct.new(
      success: timer_settings.update(update_params),
      timer_settings: timer_settings,
      errors: timer_settings.errors
    )
  end
end
