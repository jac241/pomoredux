module Pages
  class Task
    include Capybara::DSL

    attr_reader :task

    def initialize(task)
      @task = task
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
  end
end
