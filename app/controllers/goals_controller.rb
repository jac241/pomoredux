class GoalsController < ApplicationController
  before_action :authenticate_api_user!
  before_action :find_goal, only: [:edit, :update, :destroy]

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

  end

  def update
    respond_to do |format|
      if @goal.update(goal_params)
        format.js
      else
        format.js { render 'edit' }
      end
    end
  end

  def destroy
    @goal.destroy
  end

  private

  def goal_params
    params.require(:goal).permit(:title)
  end

  def find_goal
    @goal = current_api_user.goals.find(params[:id])
  end
end
