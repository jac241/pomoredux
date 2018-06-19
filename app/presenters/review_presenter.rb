class ReviewPresenter < SimpleDelegator
  include ActionView::Helpers::TextHelper

  def initialize(review)
    super(review)
  end

  def daily_goals_accomplished_message
    "#{accomplishments.count} / #{daily_goals.count} goals with #{excuses.count} excused"
  end

  def tasks_completed_message
    ActionController::Base.helpers.pluralize(tasks.count, 'tasks')
  end

  def pomodoros_completed_message
    ActionController::Base.helpers.pluralize(pomodoros.count, "🍅")
  end

  def pretty_date
    date.strftime("%B %-d, %Y")
  end
end
