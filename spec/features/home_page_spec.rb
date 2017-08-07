require 'rails_helper'

feature 'Home Page' do
  before(:each) { visit '/' }

  scenario 'Starting the pomodoro timer' do
    expect(find_by_id('time_remaining').text).to eq '25:00'

    click_on('Start')

    sleep(1.5)
    expect(find_by_id('time_remaining').text).to_not eq '25:00'
  end

  scenario 'Starting and resetting the pomodoro timer' do
    expect(find_by_id('time_remaining').text).to eq '25:00'

    click_on('Start')

    expect_timer_to_be_running

    click_on('Reset')
    expect_timer_to_not_be_running
  end

  def expect_timer_to_be_running
    sleep(1.5)
    expect(find_by_id('time_remaining').text).to_not eq '25:00'
  end

  def expect_timer_to_not_be_running
    expect(find_by_id('time_remaining').text).to eq '25:00'
    sleep(1.25)
    expect(find_by_id('time_remaining').text).to eq '25:00'
  end
end
