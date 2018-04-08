class SerializableAccomplishment < JSONAPI::Serializable::Resource
  type 'accomplishments'

  attributes :created_at

  belongs_to :daily_goal do
    data do
      DailyGoal.new(goal: @object.goal, todays_accomplishment: @object)
    end
  end
end
