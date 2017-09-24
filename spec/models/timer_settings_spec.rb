require 'rails_helper'

describe TimerSettings do
  [:pomodoro_length_ms, :short_break_length_ms, :long_break_length_ms].each do |mode|
    it { should validate_presence_of(mode)}
    it do
      should validate_numericality_of(mode).only_integer.is_greater_than(0)
    end
  end

  describe '#pomodoro_length_in_min=' do
    it 'should set pomodoro_length_ms converted from minutes to ms' do
      min = '30'
      expected_ms = 30 * 60 * 1000

      expect_correct_converstion_to_ms(:pomodoro_length, min, expected_ms)
    end
  end

  describe '#short_break_length_in_min=' do
    it 'should set short_break_length_ms converted from minutes to ms' do
      min = '30'
      expected_ms = 30 * 60 * 1000

      expect_correct_converstion_to_ms(:short_break_length, min, expected_ms)
    end
  end

  describe '#long_break_length_in_min=' do
    it 'should set long_break_length_ms converted from minutes to ms' do
      min = '30'
      expected_ms = 30 * 60 * 1000

      expect_correct_converstion_to_ms(:long_break_length, min, expected_ms)
    end
  end

  def expect_correct_converstion_to_ms(attribute, minutes, expected_ms)
    subject.public_send("#{attribute}_in_min=", minutes)

    expect(subject.public_send("#{attribute}_ms")).to eq expected_ms
  end
end
