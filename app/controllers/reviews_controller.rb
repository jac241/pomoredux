class ReviewsController < ApplicationController
  before_action :authenticate_api_user!

  def index
    @reviews = Review.all_for_user_for_month(
      current_api_user,
      start_date: params[:start_date]
    )
  end

  def show

  end
end
