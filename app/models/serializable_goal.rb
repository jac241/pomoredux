class SerializableGoal < JSONAPI::Serializable::Resource
  type 'goals'

  attributes :title, :accomplished_today

  attribute(:accomplished_today) { @object.accomplished_today? }

  has_one :todays_accomplishment do
    data do
      @object.todays_accomplishment
    end
  end
end
