require 'rails_helper'

feature 'Completing Tasks' do
  let(:user) { create(:user) }
  let(:tasks_index) { Pages::Tasks.new }

  before(:each) do
    sign_in(user)
    user.timer_settings.destroy
    create(:fast_timer_settings, user: user)
  end

  scenario "Navigating to a task's timer" do
    task = create(:task, user: user)
    tasks_index.visit_page
    task_page = tasks_index.go_to_task(task)

    expect(task_page).to be_current_page
    expect(task_page).to have_timer_for_task
  end

  scenario "Directly visiting a task's timer" do
    task = create(:task, user: user)
    task_page = Pages::Task.new(task)
    task_page.visit_page

    expect(task_page).to be_current_page
  end

  scenario 'Completing pomodoros towards a task' do
    task = create(:task, user: user)
    task_page = Pages::Task.new(task)
    task_page.visit_page

    task_page.start_timer
    task_page.wait_for_end_of_pomodoro(user.timer_settings)

    expect(task_page).to have_completed_n_pomodoros(1)
  end

  scenario 'Should show already completed pomodoros when I go to task page' do
    task = create(:task, user: user)
    create_list(:pomodoro, 3, task: task)

    task_page = Pages::Task.new(task)
    task_page.visit_page

    expect(task_page).to have_completed_n_pomodoros(3)
  end

  scenario 'Should not create pomodoro if I finished a short or long break'
end
