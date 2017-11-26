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

  scenario 'Showing nothing task related if not logged in' do
    task = create(:task, user: user)

    tasks_page.visit_page

    expect(tasks_page).to be_hidden
  end
end
