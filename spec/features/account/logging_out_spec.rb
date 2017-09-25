require 'rails_helper'

feature 'Logging out' do
  let(:user) { create(:user) }
  let(:home_page) { Pages::Home.new }
  let(:timer) { Components::Timer.new }

  before(:each) do
    sign_in(user)
  end

  scenario 'Logging out of my account' do
    home_page.visit_page
    home_page.log_out

    expect(home_page).to be_logged_out
  end

  scenario 'Logging back in after logging out' do
    home_page.visit_page
    home_page.log_out
    log_in_page = home_page.go_to_log_in_page

    log_in_page.log_in(user)

    expect(log_in_page).to have_no_error_message
    expect(home_page).to be_current_page
  end

  scenario 'Stopping the timer automatically when user logs out' do
    home_page.visit_page

    timer.start

    home_page.log_out

    expect(timer).to_not be_running(start_time: default_pomodoro_length_text)
  end
end
