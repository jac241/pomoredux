module Pages
  class Goals
    include Capybara::DSL
    include Rails.application.routes.url_helpers
    include Helpers

    def visit_page
      visit goals_path
    end

    def create_goal(goal)
      fill_in_goal(goal)
      click_on 'Save'
    end

    def edit_goal(goal)
      within(selector_for(goal)) do
        find('i.edit').click
        fill_in_goal(goal)

        click_on 'Save'
      end
    end

    def fill_in_goal(goal)
      fill_in 'goal_title', with: goal.title
    end

    def has_goal?(goal)
      within(selector_for(goal)) do
        has_content?(goal.title)
      end
    end

    def has_no_goal?(goal)
      has_no_selector?(selector_for(goal))
    end

    def has_cleared_form?
      find_field('goal_title').value == ''
    end

    def has_new_goal_errors?
      within('#new_goal') do
        find('.error')
      end
    end

    def has_edit_goal_errors_for?(goal)
      within(selector_for(goal)) do
        find('.error')
      end
    end
  end
end
