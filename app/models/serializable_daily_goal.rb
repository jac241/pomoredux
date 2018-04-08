class SerializableDailyGoal < JSONAPI::Serializable::Resource
  type 'daily_goals'

  attributes :title, :accomplished_today

  attribute(:accomplished_today) { @object.accomplished_today? }

  has_one :todays_accomplishment do
    data do
      @object.todays_accomplishment
    end
  end
end
