require 'rails_helper'

feature 'Pomodoro Timer' do
  before(:each) { visit '/' }
  let(:pomodoro_length_text) { '25:00' }
  let(:short_break_length_text) { '5:00' }

  scenario 'Starting the pomodoro timer' do
    expect(find_by_id('time_remaining').text).to eq pomodoro_length_text

    click_on('Start')

    sleep(1.5)
    expect(find_by_id('time_remaining').text).to_not eq pomodoro_length_text
  end

  scenario 'Starting and resetting the pomodoro timer' do
    expect(find_by_id('time_remaining').text).to eq '25:00'

    click_on('Start')

    expect_timer_to_be_running

    click_on('Reset')
    expect_timer_to_not_be_running(expected_time: pomodoro_length_text)
  end

  scenario 'pomodoro button should be active by default' do
    expect(find_button('Pomodoro')['class']).to include('active')
  end

  scenario 'switching to short break mode should start a short break' do
    button = find_button('Short Break')
    button.click
    expect(button['class']).to include('active')

    expect_timer_to_be_running(timer_length: short_break_length_text)
  end

  def expect_timer_to_be_running(timer_length: '25:00')
    timer_format = '%M:%S'

    start_time =
      DateTime.strptime(timer_length, timer_format).seconds_since_midnight

    sleep(1.5)

    remaining_time =
      DateTime
        .strptime(find_by_id('time_remaining').text, timer_format)
        .seconds_since_midnight

    expect(remaining_time).to eq (start_time - 1)
  end

  def expect_timer_to_not_be_running(expected_time:)
    expect(find_by_id('time_remaining').text).to eq expected_time
    sleep(1.25)
    expect(find_by_id('time_remaining').text).to eq expected_time
  end
end
