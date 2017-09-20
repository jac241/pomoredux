module SharedSteps
  def default_pomodoro_length_text
    '25:00'
  end

  def default_short_break_length_text
    '5:00'
  end

  def fill_in_new_user_session_form
    within "#new_user_session" do
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)

      click_on('Log In')
    end
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
