require_relative 'log_in'

module Pages
  class Home
    include Capybara::DSL

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
  end
end

