require_relative 'log_in'

module Pages
  class Home
    include Capybara::DSL

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
  end
end

