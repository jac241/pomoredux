require 'rails_helper'

class SettingsPage
  include Capybara::DSL

  def visit_page
    visit '/settings'
  end

  def change_settings(pomodoro: nil, short_break: nil, long_break: nil)
    within('#edit_timer_settings') do
      fill_in('Pomodoro Length', with: pomodoro) if pomodoro
      fill_in('Short Break Length', with: short_break) if short_break
      fill_in('Long Break Length', with: long_break) if long_break

      click_on('Save Changes')
    end
  end

  def has_success_message?
    has_text?('Changes saved!')
  end

  def has_correct_values?(expected_values)
    expected_values.all? do |setting, value|
      find_field(setting).value == value
    end
  end

  def has_settings_error_messages?
    has_text?('There were errors saving your settings.')
  end
end

feature 'Timer settings' do
  let(:user) { create(:user) }
  let(:settings_page) { SettingsPage.new }

  scenario 'Changing timer settings from default' do
    sign_in(user)

    visit '/'

    find('a', text: 'Settings').click

    settings_page.change_settings(
      pomodoro: '50',
      short_break: '3',
      long_break: '15'
    )

    expect(settings_page).to have_success_message

    visit('/')

    click_on('Pomodoro')
    expect_timer_to_be_running(timer_length: '50:00')

    click_on('Short Break')
    expect_timer_to_be_running(timer_length: '03:00')

    click_on('Long Break')
    expect_timer_to_be_running(timer_length: '15:00')
  end

  scenario 'Viewing current settings on settings form' do
    sign_in(user)
    user.timer_settings.update(attributes_for(:non_default_timer_settings))

    settings_page.visit_page

    expect(settings_page).to have_correct_values({
      'Pomodoro Length' => '50',
      'Short Break Length' => '3',
      'Long Break Length' => '15'
    })
  end

  scenario 'Redirecting to login if visit settings page when logged out' do
    settings_page.visit_page
    expect(page).to have_current_path('/login')
  end

  scenario 'Redirecting to login if logged out while filling in form' do
    sign_in(user)
    settings_page.visit_page
    sign_out(user)

    settings_page.change_settings(pomodoro: '50')
    expect(page).to have_current_path('/login')
    expect(user.timer_settings.pomodoro_length_ms).to_not eq(50 * 60 * 1000)
  end

  scenario 'Trying to set invalid times' do
    sign_in(user)
    settings_page.visit_page

    settings_page.change_settings(
      pomodoro: '-1',
      short_break: '-1',
      long_break: '-1'
    )

    expect(settings_page).to have_settings_error_messages
  end

  scenario 'Bug - Settings should not reset during timer tick' do
    sign_in(user)

    visit '/'

    click_on('Start')

    find('a', text: 'Settings').click

    fill_in('Pomodoro Length', with: '1')

    sleep 1.1

    expect(settings_page).to have_correct_values({ 'Pomodoro Length' => '1' })
  end

  scenario 'Timer goes to default settings on log out'
  scenario 'Resetting success message with new changes'
end
