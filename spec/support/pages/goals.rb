module Pages
  class Goals
    include Capybara::DSL
    include Rails.application.routes.url_helpers
    include ActionView::Helpers

    def visit_page
      visit goals_path
    end

    def create_goal(goal)
      fill_in_goal(goal)
      click_on 'Create Goal'
    end

    def fill_in_goal(goal)
      fill_in 'goal_title', with: goal.title
    end

    def has_goal?(goal)
      within(selector_for(goal)) do
        has_content?(goal.title)
      end
    end

    def selector_for(record)
      "##{dom_id(record)}"
    end

    def has_cleared_form?
      find_field('goal_title').value == ''
    end

    def has_new_goal_errors?
      within('#new_goal') do
        has_content?("can't be blank")
      end
    end
  end
end
