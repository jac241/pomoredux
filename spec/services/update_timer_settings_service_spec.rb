require 'rails_helper'

describe UpdateTimerSettingsService do
  let(:user) { create(:user) }
  let(:update_params) do
    {
      pomodoro_length_in_min: '40',
      short_break_length_in_min: '2',
      long_break_length_in_min: '10'
    }
  end

  subject { described_class.new }

  describe '#call' do
    it 'should update the users timer settings' do
      subject.call(user: user, update_params: update_params)

      defaults = TimerSettings::DEFAULTS
      timer_settings = user.timer_settings
      expect(timer_settings.pomodoro_length_ms).to_not eq defaults[:pomodoro_length_ms]
      expect(timer_settings.short_break_length_ms).to_not eq defaults[:short_break_length_ms]
      expect(timer_settings.long_break_length_ms).to_not eq defaults[:long_break_length_ms]
    end

    it 'should return a results object with success and the timer_settings' do
      results = subject.call(user: user, update_params: update_params)

      expect(results.timer_settings).to eq user.timer_settings
      expect(results.success).to eq true
    end
  end
end
