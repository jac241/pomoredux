class SerializableExcuse < JSONAPI::Serializable::Resource
  type 'excuses'

  attributes :description, :created_at

  belongs_to :daily_goal do
    data do
      DailyGoal.new(goal: @object.goal, todays_excuse: @object)
    end
  end
end
