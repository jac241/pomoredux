require 'rails_helper'

describe UpdateTaskService do
  let(:user) { create(:user) }
  let(:task) { create(:task, user: user) }
  let(:params) {{ id: task.id, completed: true }}

  it 'should update the task with the completion time' do
    call_service

    task.reload
    expect(task.completed_at).to_not be_nil
  end

  def call_service
    UpdateTaskService.call(user: user, params: params)
  end

  it 'should return success with the task' do
    results = call_service

    expect(results.success?).to be_truthy
    expect(results.status).to eq :updated
    expect(results.body).to eq task
  end
end
