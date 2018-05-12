require_relative 'log_in'

module Pages
  class Home
    include Capybara::DSL
    include Pages::Helpers

    attr_reader :goals_page

    def initialize(goals_page: Goals.new)
      @goals_page = goals_page
    end

    def visit_page
      visit '/'
    end

    def log_out
      find('a', text: 'Log Out').click
    end

    def go_to_log_in_page
      find('a', text: 'Log In').click
      return LogIn.new
    end

    def logged_out?
      result = true
      result &&= has_text?('Log In')
      return result
    end

    def current_page?
      has_current_path?('/')
    end

    delegate :has_goal?, to: :goals_page

    def toggle_goal_met(goal)
      within(daily_goal_selector_for(goal)) do
        find('.checkbox').click
      end
    end

    def has_accomplished_goal?(goal)
      within("#{daily_goal_selector_for(goal)}") do
        has_selector?("#{daily_goal_selector_for(goal)}_title.accomplished")
      end
    end

    def has_unaccomplished_goal?(goal)
      within("#{daily_goal_selector_for(goal)}") do
        has_no_selector?(".checkbox.checked")
      end
    end

    def has_daily_goal?(goal)
      has_selector?(daily_goal_selector_for(goal))
    end

    def has_no_daily_goal?(goal)
      has_no_selector?(daily_goal_selector_for(goal))
    end

    def daily_goal_selector_for(goal)
      selector_for(daily_goal(goal))
    end

    def daily_goal(goal)
      DailyGoal.new(goal: goal, todays_accomplishment: nil)
    end

    def create_excuse_for(
        excuse,
        excusable:,
        excuse_form: Components::ExcuseModal.new)
      selector = daily_goal_selector_for(excusable)

      within(selector) do
        open_excuse_modal_for(excusable)
      end

      excuse_form.create_excuse_for(excuse, excusable: excusable)
    end

    def open_excuse_modal_for(excusable)
      find(excuse_selector_for(excusable)).click
    end

    def has_open_excuse_modal?
      has_selector?('#excuse_modal')
    end

    def has_no_excuse_modal?
      has_no_selector?('#excuse_modal')
    end

    def has_excuse_for?(excuse, goal)
      within(daily_goal_selector_for(goal)) do
        return false unless has_selector?("i[data-excused=\"true\"]")
        open_excuse_modal_for(goal)
      end

      modal = Components::ExcuseModal.new
      return false unless modal.has_excuse?(excuse)
      modal.close
    end

    def excuse_selector_for(goal)
      "#{daily_goal_selector_for(goal)}_excuse"
    end

    def update_excuse_for(
      excuse,
      excusable,
      excuse_form: Components::ExcuseModal.new
    )
      open_excuse_modal_for(excusable)

      excuse_form.update_excuse(excuse)
    end

    def has_excuse_error?(error_text)
      has_content?(error_text)
    end
  end
end

