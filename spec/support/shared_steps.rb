module SharedSteps
  def fill_in_new_user_session_form
    within "#new_user_session" do
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)

      click_on('Log In')
    end
  end
end
