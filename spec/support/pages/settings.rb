module Pages
  class Settings
    include Capybara::DSL

    def visit_page
      visit '/settings'
    end

    def change_settings(pomodoro: nil, short_break: nil, long_break: nil)
      within('#edit_timer_settings') do
        fill_in('Pomodoro Length', with: pomodoro) if pomodoro
        fill_in('Short Break Length', with: short_break) if short_break
        fill_in('Long Break Length', with: long_break) if long_break

        click_on('Save Changes')
      end
    end

    def has_success_message?
      has_text?('Changes saved!')
    end

    def has_correct_values?(expected_values)
      expected_values.all? do |setting, value|
        find_field(setting).value == value
      end
    end

    def has_settings_error_messages?
      has_text?('There were errors saving your settings.')
    end
  end
end