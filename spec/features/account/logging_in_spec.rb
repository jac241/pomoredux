require 'rails_helper'

feature 'Logging in to my account' do
  let(:user) { create(:user) }

  scenario 'Logging in to existing account' do
    visit '/'

    find('a', text: 'Log In').click

    fill_in_new_user_session_form

    expect(page).to have_current_path('/')

    expect(page).to_not have_content('Log In')
    expect(page).to_not have_content('Sign Up')
  end

  scenario 'Trying to log in with the wrong password' do
    visit '/login'

    user.password = 'wrongpassword'
    fill_in_new_user_session_form
    there_should_be_an_error_message
  end

  scenario 'Hiding log in and sign up links when already logged in' do
    sign_in(user)

    visit '/'

    expect(page).to_not have_content('Log In')
    expect(page).to_not have_content('Sign Up')
    expect(page).to_not have_content('Welcome to')
  end

  def there_should_be_an_error_message
    expect(page).to have_content('Incorrect email or password.')
  end
end
