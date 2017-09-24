require 'rails_helper'

describe UpdateTimerSettingsService do
  let(:user) { create(:user) }
  let(:update_params) { attributes_for(:non_default_timer_settings) }

  subject { described_class.new }

  describe '#call' do
    it 'should update the users timer settings' do
      call_service

      defaults = TimerSettings::DEFAULTS
      timer_settings = user.timer_settings
      expect(timer_settings.pomodoro_length_ms).to_not eq defaults[:pomodoro_length_ms]
      expect(timer_settings.short_break_length_ms).to_not eq defaults[:short_break_length_ms]
      expect(timer_settings.long_break_length_ms).to_not eq defaults[:long_break_length_ms]
    end

    it 'should return a results object with success and the timer_settings' do
      results = call_service

      expect(results.timer_settings).to eq user.timer_settings
      expect(results.success).to eq true
      expect(results.errors).to_not be_present
    end

    context 'Invalid update params' do
      let(:update_params) { attributes_for(:invalid_timer_settings) }

      it 'should return success false' do
        results = call_service

        expect(results.success).to be false
      end

      it 'should return the errors' do
        results = call_service
        expect(results.errors).to be_present
      end
    end
  end

  def call_service
    subject.call(user: user, update_params: update_params)
  end
end
