class Review
  include ActiveModel::Model

  attr_accessor :date, :accomplishments, :excuses, :tasks, :pomodoros,
    :daily_goals

  def self.all_for_user_for_month(user, start_date:)
    start_date = start_date ? Date.parse(start_date) : Date.today
    month_query_range = start_date.beginning_of_month..start_date.end_of_month

    daily_goals = DailyGoal.all_for_user(user)

    accomplishments_by_day =
      user.accomplishments
          .where(created_at: month_query_range)
          .group_by { |a| a.created_at.to_date }

    month_query_range.map do |day|
      self.new(
        date: day,
        accomplishments: accomplishments_by_day[day] || [],
        daily_goals: daily_goals.select { |dg| day >= dg.created_at.to_date }
      )
    end
  end

end
