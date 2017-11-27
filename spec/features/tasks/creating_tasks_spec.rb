require 'rails_helper'

feature 'Creating Tasks' do
  let(:user) { create(:user) }
  let(:new_task) { build(:task) }
  let(:tasks_page) { Pages::Tasks.new }

  before(:each) do
    sign_in(user)
    tasks_page.visit_page
  end

  scenario 'Creating a new task' do
    tasks_page.visit_page
    tasks_page.add_task(new_task)
    tasks_page.save_new_task

    expect(tasks_page.modal).to be_hidden
    expect(tasks_page).to have_task(new_task)
  end

  bad_tasks = [
    {
      task: Task.new(title: '', estimated_num_pomodoros: 3),
      error: "can't be blank",
      test_desc: 'with blank title'
    },
    {
      task: Task.new(title: 't', estimated_num_pomodoros: ''),
      error: "can't be blank",
      test_desc: 'with blank estimate'
    },
    {
      task: Task.new(title: 't', estimated_num_pomodoros: -1),
      error: 'must be greater than 0',
      test_desc: 'with negative estimate'
    }
  ].each do |params|
    scenario "Trying to create invalid task with #{params[:test_desc]}" do

      tasks_page.add_task(params[:task])
      tasks_page.save_new_task

      expect(tasks_page).to have_new_task_error(params[:error])

      tasks_page.visit_page
    end
  end
end
