require_relative '../shared_steps'

module Pages
  class Task
    include Capybara::DSL

    attr_reader :task

    def initialize(task)
      @task = task
    end

    def visit_page
      visit "/tasks/#{task.id}"
    end

    def current_page?
      has_current_path?("/tasks/#{task.id}")
    end

    def has_timer_for_task?
      has_content?(task.title) && has_estimation?
    end

    def has_estimation?
      within('#estimated_num_pomodoros') do
        return has_content?(task.estimated_num_pomodoros)
      end
    end

    def start_timer
      click_on('Start')
    end

    def wait_for_end_of_pomodoro(timer_settings)
      sleep(timer_settings.pomodoro_length_ms / 1000 + 1)
    end

    def has_completed_n_pomodoros?(n)
      within('#num_completed_pomodoros') do
        return has_content?(n)
      end
    end

    def go_to_tasks_page
      click_on('Home')
    end
  end
end
