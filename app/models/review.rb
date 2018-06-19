class Review
  include ActiveModel::Model

  attr_accessor :date, :accomplishments, :excuses, :tasks, :pomodoros,
    :daily_goals

  def self.all_for_user_for_month(user, start_date:)
    start_date = start_date ? Date.parse(start_date) : Date.today
    month_query_range = start_date.beginning_of_month..start_date.end_of_month

    daily_goals = DailyGoal.all_for_user(user)

    created_at_date = -> (record) { record.created_at.to_date }

    accomplishments_by_day =
      user.accomplishments
          .where(created_at: month_query_range)
          .group_by(&created_at_date)

    excuses_by_day =
      user.excuses
          .where(created_at: month_query_range)
          .group_by(&created_at_date)

    tasks_completed_by_day =
      user.tasks
          .where(completed_at: month_query_range)
          .group_by { |task| task.completed_at.to_date }

    pomodoros_completed_by_day =
      user.pomodoros
          .where(created_at: month_query_range)
          .group_by(&created_at_date)

    month_query_range.map do |day|
      self.new(
        date: day,
        accomplishments: accomplishments_by_day[day] || [],
        daily_goals: daily_goals.select { |dg| day >= dg.created_at.to_date },
        excuses: excuses_by_day[day] || [],
        tasks: tasks_completed_by_day[day] || [],
        pomodoros: pomodoros_completed_by_day[day] || []
      )
    end
  end

end
