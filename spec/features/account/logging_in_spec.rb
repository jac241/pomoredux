require 'rails_helper'

feature 'Logging in to my account' do
  let(:home_page) { Pages::Home.new }
  let(:user) { create(:user) }
  let(:login_page) { Pages::LogIn.new }

  scenario 'Logging in to existing account' do
    home_page.visit_page
    login_page = home_page.go_to_log_in_page
    login_page.log_in(user)

    expect(home_page).to be_current_page

    expect(page).to_not have_content('Log In')
    expect(page).to_not have_content('Sign Up')
  end

  scenario 'Trying to log in with the wrong password' do
    login_page.visit_page

    user.password = 'wrongpassword'
    login_page.log_in(user)

    expect(login_page).to have_login_error
  end

  scenario 'Hiding log in and sign up links when already logged in' do
    sign_in(user)

    home_page.visit_page

    expect(page).to_not have_content('Log In')
    expect(page).to_not have_content('Sign Up')
    expect(page).to_not have_content('Welcome to')
  end

  scenario 'Keeping users signed in' do
    login_page.visit_page
    login_page.fill_in_user_info_for(user)
    login_page.keep_user_signed_in
    login_page.submit_form

    expect(home_page).to be_current_page
  end
end
