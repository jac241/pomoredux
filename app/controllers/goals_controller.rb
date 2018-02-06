class GoalsController < ApplicationController
  before_action :authenticate_api_user!

  def index
    @goals = Goal.all
    @goal = @goals.new
  end

  def create
    @goal = Goal.new(create_params)

    respond_to do |format|
      if @goal.save
        format.js
      else
        format.js { render :new }
      end
    end
  end

  private

  def create_params
    params.require(:goal).permit(:title)
  end
end
