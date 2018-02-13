class GoalPresenter < SimpleDelegator
  def initialize(goal)
    super(goal)
  end

  def deletion_confirm_message
    "Are you sure you want to delete goal '#{title}'? All recorded accomplishments for this goal will also be deleted."
  end
end
