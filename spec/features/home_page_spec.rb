require 'rails_helper'

feature "Home Page" do
  scenario "Visiting the home page" do
    visit "/"

    expect(page).to have_text("Welcome to Pomoredux")
  end
end
