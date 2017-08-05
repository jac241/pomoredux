require 'rails_helper'

feature 'Home Page' do
  before(:each) { visit '/' }

  scenario 'Starting the pomodoro timer' do
    expect(find_by_id('time_remaining').text).to eq '25:00'

    click_on('Start')

    sleep(1.5)
    expect(find_by_id('time_remaining').text).to_not eq '25:00'
  end
end
