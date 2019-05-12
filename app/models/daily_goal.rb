class DailyGoal
  include ActiveModel::Model

  attr_accessor :goal, :todays_accomplishment, :todays_excuse

  def self.all_for_user(user, include_destroyed: false)
    goals = include_destroyed ? user.goals.with_deleted : user.goals

    accomplishments_by_goal_id =
      user.accomplishments.created_today.group_by(&:goal_id)

    excuses_by_goal_id =
      user.excuses.created_today.group_by(&:goal_id)

    goals.map do |goal|
      self.new(
        goal: goal,
        todays_accomplishment: accomplishments_by_goal_id[goal.id].try(:first),
        todays_excuse: excuses_by_goal_id[goal.id].try(:first)
      )
    end
  end

  delegate :id, :title, :persisted?, :created_at, :deleted_at, to: :goal

  def accomplished_today?
    todays_accomplishment.present?
  end

  def excused_today?
    todays_excuse.present?
  end
end
