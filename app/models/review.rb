class Review
  include ActiveModel::Model

  attr_accessor :date, :accomplishments, :excuses, :tasks, :pomodoros,
    :daily_goals, :user

  def self.all_for_user_for_month(user, start_date:)
    start_date = start_date ? Date.parse(start_date) : Date.today
    month_query_range =
      (start_date.beginning_of_month - 1.week)..(start_date.end_of_month + 1.week)

    daily_goals = DailyGoal.all_for_user(user, include_destroyed: true)

    created_at_date = -> (record) { record.created_at.to_date }

    accomplishments_by_day =
      Goal.unscoped do
        user.accomplishments
            .where(created_at: month_query_range)
            .group_by(&created_at_date)
      end

    excuses_by_day =
      Goal.unscoped do
        user.excuses
            .where(created_at: month_query_range)
            .group_by(&created_at_date)
      end

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
        user: user,
        date: day,
        accomplishments: accomplishments_by_day[day] || [],
        daily_goals: daily_goals.select { |dg| day >= dg.created_at.to_date },
        excuses: excuses_by_day[day] || [],
        tasks: tasks_completed_by_day[day] || [],
        pomodoros: pomodoros_completed_by_day[day] || []
      )
    end
  end

  def self.find_by_date_and_user(date:, user:)
    parsed_date = Date.parse(date)
    day_query_range = (parsed_date.beginning_of_day)..(parsed_date.end_of_day)

    tasks =
      user.tasks.where(completed_at: day_query_range)

    accomplishments = 
      Goal.unscoped { user.accomplishments.includes(:goal).where(created_at: day_query_range) }

    excuses =
      Goal.unscoped { user.excuses.includes(:goal).where(created_at: day_query_range) }

    self.new(
      user: user,
      date: parsed_date,
      tasks: tasks,
      accomplishments: accomplishments,
      excuses: excuses
    )
  end

  def to_param
    date.to_s
  end

  def will_contain_data?
    date >= user.created_at && date <= Date.today 
  end
end
