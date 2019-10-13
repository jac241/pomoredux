module Pages
  class LogIn
    include Capybara::DSL

    def visit_page
      visit('/login')
    end

    def log_in(user)
      within "#new_user_session" do
        fill_in('Email', with: user.email)
        fill_in('Password', with: user.password)

        click_on('Log In')
      end
    end

    def fill_in_user_info_for(user)
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
    end

    def keep_user_signed_in
      within '#new_user_session' do
        find('label[for=user_remember_me]').set(true)
      end
    end

    def submit_form
      within '#new_user_session' do
        click_on('Log In')
      end
    end

    def has_no_error_message?
      has_no_text?('Error')
    end

    def has_login_error?
      has_content?('Incorrect email or password.')
    end
  end
end
