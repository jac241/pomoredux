require 'rails_helper'

feature 'Securing Tasks' do
  let(:user) { create(:user) }
  let(:tasks_page) { Pages::Tasks.new }

  scenario 'Showing nothing task related if not logged in' do
    task = create(:task, user: user)

    tasks_page.visit_page

    expect(tasks_page).to be_hidden
  end

  scenario 'Tasks should not leak between users' do
    home_page = Pages::Home.new
    task = create(:task, user: user)
    user2 = create(:user, email: 'joe@example.com')

    sign_in(user)
    tasks_page.visit_page
    sleep 1
    home_page.log_out
    login_page = home_page.go_to_log_in_page
    login_page.log_in(user2)

    expect(tasks_page).to have_no_task(task)
  end
end
