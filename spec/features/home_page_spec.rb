require 'rails_helper'

feature 'Home Page' do
  scenario 'Visiting the home page' do
    visit '/'

    expect(page).to have_text('Welcome to Pomoredux')
  end

  scenario 'Starting the pomodoro timer' do
    visit '/'

    expect(find_by_id('time_remaining').text).to eq '25:00'

    click_on('Start')

    expect(find_by_id('time_remaining').text).to_not eq '25:00'
  end
end
