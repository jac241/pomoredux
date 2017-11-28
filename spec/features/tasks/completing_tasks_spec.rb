require 'rails_helper'

feature 'Completing Tasks' do
  let(:user) { create(:user) }
  let(:tasks_index) { Pages::Tasks.new }

  before(:each) { sign_in(user) }

  scenario "Navigating to a task's timer" do
    task = create(:task, user: user)
    tasks_index.visit_page
    task_page = tasks_index.go_to_task(task)

    expect(task_page).to be_current_page
    expect(task_page).to have_timer_for_task
  end
end
