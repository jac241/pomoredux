require 'rails_helper'

describe CreatePomodoroService do
  let(:user) { create(:user) }
  let(:task) { create(:task, user: user) }

  it 'should create a pomodoro for the given user and task' do
    call_service

    expect(task.pomodoros.count).to eq 1
  end

  def call_service
    described_class.call(user: user, task_id: task.id)
  end

  it 'should return success with the pomodoro' do
    result = call_service

    expect(result.success?).to be_truthy
    expect(result.status).to eq :created
    expect(result.body.task_id).to eq task.id
  end
end
