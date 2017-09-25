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
      return running
    end
  end
end

