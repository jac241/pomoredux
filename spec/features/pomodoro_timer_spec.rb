require 'rails_helper'

feature 'Pomodoro Timer' do
  before(:each) { visit '/' }

  scenario 'Starting the pomodoro timer' do
    expect(find_by_id('time_remaining').text).to eq default_pomodoro_length_text

    click_on('Start')

    sleep(1.5)
    expect(find_by_id('time_remaining').text).to_not eq default_pomodoro_length_text
  end

  scenario 'Starting and resetting the pomodoro timer' do
    expect(find_by_id('time_remaining').text).to eq '25:00'

    click_on('Start')

    expect_timer_to_be_running

    click_on('Reset')
    expect_timer_to_not_be_running(expected_time: default_pomodoro_length_text)
  end

  scenario 'pomodoro button should be active by default' do
    expect(find_button('Pomodoro')['class']).to include('active')
  end

  scenario 'switching to short break mode should start a short break' do
    button = find_button('Short Break')
    button.click
    expect(button['class']).to include('active')

    expect_timer_to_be_running(timer_length: default_short_break_length_text)
  end
end
