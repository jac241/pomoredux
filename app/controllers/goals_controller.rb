class GoalsController < ApplicationController
  before_action :authenticate_api_user!

  def index
    @goals = current_api_user.goals
    @goal = Goal.new
  end

  def create
    @goal = current_api_user.goals.new(goal_params)

    respond_to do |format|
      if @goal.save
        format.js
      else
        format.js { render :new }
      end
    end
  end

  def edit
    @goal = current_api_user.goals.find(params[:id])
  end

  def update
    @goal = current_api_user.goals.find(params[:id])

    respond_to do |format|
      if @goal.update(goal_params)
        format.js
      else
        format.js { render 'edit' }
      end
    end
  end

  private

  def goal_params
    params.require(:goal).permit(:title)
  end
end
