require 'rails_helper'

feature 'Creating Tasks' do
  let(:user) { create(:user) }
  let(:new_task) { build(:task) }
  let(:tasks_page) { Pages::Tasks.new }

  scenario 'Creating a new task' do
    sign_in(user)

    tasks_page.visit_page
    tasks_page.add_task(new_task)
    tasks_page.save_new_task

    expect(tasks_page.modal).to be_hidden
    expect(tasks_page).to have_task(new_task)
  end
end
