class DailyGoal
  extend ActiveModel::Naming
  include ActiveModel::Conversion

  attr_reader :goal, :todays_accomplishment

  def initialize(goal:, todays_accomplishment:)
    @goal = goal
    @todays_accomplishment = todays_accomplishment
  end

  def self.all_for_user(user)
    goals = user.goals

    accomplishments_by_goal_id =
      user.accomplishments.created_today.group_by(&:goal_id)

    goals.map do |goal|
      self.new(
        goal: goal,
        todays_accomplishment: accomplishments_by_goal_id[goal.id].try(:first)
      )
    end
  end

  delegate :id, :title, :persisted?, to: :goal

  def accomplished_today?
    todays_accomplishment.present?
  end

  def to_model
    self
  end
end
