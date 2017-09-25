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

  class LogIn
    include Capybara::DSL

    def log_in(user)
      within "#new_user_session" do
        fill_in('Email', with: user.email)
        fill_in('Password', with: user.password)

        click_on('Log In')
      end
    end

    def has_no_error_message?
      has_no_text?('Error')
    end
  end
end

