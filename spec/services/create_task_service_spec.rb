require 'rails_helper'

describe CreateTaskService do
  let(:user) { create(:user) }
  let :create_params do
    {
      'title' => 't',
      'estimated_num_pomodoros' => 4
    }
  end

  describe '#call' do
    it 'should create a task for the passed user' do
      call_service

      expect(user.tasks.count).to eq 1
    end

    it 'should return success and the task' do
      result = call_service

      expect(result.success?).to be_truthy
      expect(result.status).to eq :created
      expect(result.body.title).to eq(create_params['title'])
      expect(result.body.estimated_num_pomodoros).to eq(create_params['estimated_num_pomodoros'])
    end

    context 'invalid params' do
      let(:create_params) {{}}

      it 'should fail with status invalid params' do
        results = call_service

        expect(results.success?).to be_falsy
        expect(results.status).to eq :invalid_params
      end

      it 'should return the task unpersisted' do
        results = call_service

        expect(results.body.persisted?).to be_falsy
      end
    end
  end

  def call_service
    described_class.call(user: user, create_params: create_params)
  end
end
