require 'rails_helper'

feature 'Listing Tasks' do
  let(:user) { create(:user) }
  let(:tasks_page) { Pages::Tasks.new }

  scenario 'Listing existing tasks' do
    tasks = [
      create(:task, title: 't1', estimated_num_pomodoros: 1, user: user),
      create(:task, title: 't2', estimated_num_pomodoros: 2, user: user)
    ]

    sign_in(user)

    tasks_page.visit_page

    tasks.each do |task|
      expect(tasks_page).to have_task(task)
    end
  end

  scenario 'BUG: completed pomodoro overwrites pomodoros for other tasks' do
    sign_in(user)
    user.timer_settings.destroy
    create(:fast_timer_settings, user: user)

    task1 = create(:task, user: user)
    create_list(:pomodoro, 2, task: task1)

    task2 = create(:task, user: user)
    tasks_page.visit_page

    task1_page = tasks_page.go_to_task(task1)
    task1_page.go_to_tasks_page
    task2_page = tasks_page.go_to_task(task2)
    task2_page.start_timer
    task2_page.wait_for_end_of_pomodoro(user.timer_settings)
    task2_page.go_to_tasks_page

    expect(tasks_page).to be_showing_n_completed_pomodoros_for_task(n: 2, task: task1)
  end
end
