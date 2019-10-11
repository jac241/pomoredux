require 'rails_helper'

feature 'Timer settings' do
  let(:user) { create(:user) }
  let(:task) { create(:task, user: user) }
  let(:settings_page) { Pages::Settings.new }
  let(:home_page) { Pages::Home.new }
  let(:timer) { Components::Timer.new }
  let(:task_page) { Pages::Task.new(task) }

  scenario 'Changing timer settings from default' do
    sign_in(user)

    visit '/'

    find('a', text: 'Settings').click

    settings_page.save_new_settings(
      volume: '5',
      pomodoro: '50',
      short_break: '3',
      long_break: '15',
    )

    expect(settings_page).to have_success_message

    task_page.visit_page

    click_on('Pomodoro')
    expect_timer_to_be_running(timer_length: '50:00')

    click_on('Short Break')
    expect_timer_to_be_running(timer_length: '03:00')

    click_on('Long Break')
    expect_timer_to_be_running(timer_length: '15:00')
  end

  scenario 'Viewing current settings on settings form' do
    sign_in(user)
    change_timer_settings(user)

    settings_page.visit_page

    expect(settings_page).to have_correct_values({
      'volume' => '5',
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

    settings_page.save_new_settings(pomodoro: '50')
    expect(page).to have_current_path('/login')
    expect(user.timer_settings.pomodoro_length_ms).to_not eq(50 * 60 * 1000)
  end

  scenario 'Trying to set invalid times' do
    sign_in(user)
    settings_page.visit_page

    settings_page.save_new_settings(
      pomodoro: '-1',
      short_break: '-1',
      long_break: '-1'
    )

    expect(settings_page).to have_settings_error_messages
  end

  scenario 'Bug - Settings should not reset during timer tick' do
    sign_in(user)

    task_page.visit_page

    click_on('Start')

    find('a', text: 'Settings').click

    fill_in('Pomodoro Length', with: '1')

    sleep 1.1

    expect(settings_page).to have_correct_values({ 'Pomodoro Length' => '1' })
  end

  scenario 'Timer goes to default settings on log out' do
    sign_in(user)
    change_timer_settings(user)
    task_page.visit_page

    expect(timer).to have_correct_settings(user.timer_settings)

    timer.switch_to_mode('Pomodoro')
    home_page.log_out

    default_settings = build(:timer_settings)
    expect(timer).to have_correct_setting(default_settings.pomodoro_length_ms)
    expect(timer).to have_correct_settings(default_settings)
  end

  scenario 'Resetting success message with new changes' do
    sign_in(user)
    settings_page.visit_page

    settings_page.save_new_settings(pomodoro: '1')
    expect(settings_page).to have_success_message

    settings_page.change_settings_values(pomodoro: '10')

    expect(settings_page).to have_no_success_message
  end

  scenario 'Enabling browswer notifications' do
    sign_in(user)
    settings_page.visit_page

    settings_page.save_new_settings(can_notify: true)

    visit current_path

    expect(settings_page).to have_browser_notifications_enabled
  end

  def change_timer_settings(user)
    user.timer_settings.update(attributes_for(:non_default_timer_settings))
  end
end
