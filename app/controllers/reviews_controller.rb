class ReviewsController < ApplicationController
  before_action :authenticate_api_user!

  def index
    @reviews = Review.all_for_user_for_month(
      current_api_user,
      start_date: params[:start_date]
    )
  end

  def show
    @review = ReviewPresenter.new(
      Review.find_by_date_and_user(
        date: params[:date],
        user: current_api_user
      )
    )
  end
end
