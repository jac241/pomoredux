require 'rails_helper'

feature 'Timer settings' do
  let(:user) { create(:user) }
  scenario 'Changing timer settings from default' do
    sign_in(user)
    visit '/'

    find('a', text: 'Settings').click

    within('#edit_timer_settings') do
      fill_in('Pomodoro Length', with: '50')
      fill_in('Short Break Length', with: '3')
      fill_in('Long Break Length', with: '15')

      click_on('Save Changes')
    end

    expect(page).to have_content('Changes saved!')

    visit('/')

    expect(find_by_id('time_remaining').text).to eq '50:00'

    click_on('Short Break')

    expect(find_by_id('time_remaining').text).to eq '03:00'

    click_on('Long Break')

    expect(find_by_id('time_remaining').text).to eq '15:00'
  end

  scenario 'Timer goes to default settings on log out'
  scenario 'Trying to set blank times'
  scenario 'Viewing current settings on settings form'
  scenario 'Resetting success message with new changes'
  scenario 'Trying to update timer settings when logged out'
end
