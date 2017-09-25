module Components
  class Timer
    include Capybara::DSL

    def start
      click_on('Start')
    end

    def running?(start_time:)
      running = true
      running &&= find_by_id('time_remaining').text != start_time
      sleep(1.25)
      running &&= find_by_id('time_remaining').text != start_time
      running
    end

    def has_correct_settings?(settings)
      ms_by_mode = {
        "Pomodoro" => settings.pomodoro_length_ms,
        "Short Break" => settings.short_break_length_ms,
        "Long Break" => settings.long_break_length_ms
      }

      ms_by_mode.all? do |mode, ms|
        switch_to_mode(mode)
        has_timer_text(ms)
      end
    end

    private

    def switch_to_mode(mode)
      click_on(mode)
    end

    def has_timer_text(ms)
      has_text?(ms_to_strtime(ms))
    end

    def ms_to_strtime(ms)
      "#{ms_to_min(ms)}:00"
    end

    def ms_to_min(ms)
      ms / 1000 / 60
    end
  end
end

