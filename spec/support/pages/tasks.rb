require_relative 'task'

module Pages
  class Tasks
    include Capybara::DSL

    def visit_page
      visit '/'
    end

    def add_task(task)
      click_on 'Add a task'

      fill_in 'title', with: task.title
      fill_in 'estimated_num_pomodoros', with: task.estimated_num_pomodoros
    end

    def save_new_task
      click_on 'Add'
    end

    def has_task?(task)
      within '#tasks' do
        return has_content?(task.title) && has_content?(task.estimated_num_pomodoros)
      end
    end

    def has_no_task?(task)
      return true if has_no_selector?('#tasks')

      has_no_content?(task.title) && has_no_content?(task.estimated_num_pomodoros)
    end

    def hidden?
      has_no_selector?('#task_section')
    end

    def has_new_task_error?(error_text)
      within '#new_task' do
        (
          has_content?('There were errors creating your task') &&
          has_content?(error_text)
        )
      end
    end

    def go_to_task(task)
      within("#tasks") do
        find("#task_#{task.id}").click
      end

      Pages::Task.new(task)
    end

    def modal
      @model ||= Modal.new
    end

    def showing_n_completed_pomodoros_for_task?(n:, task:)
      within("#task_#{task.id}") do
        return has_content?("Completed: #{n}")
      end
    end

    class Modal
      include Capybara::DSL

      def hidden?
        has_no_text?('New task')
      end
    end
  end
end
