class SerializableDailyGoal < JSONAPI::Serializable::Resource
  type 'daily_goals'

  attributes :title, :accomplished_today, :excused_today

  attribute(:accomplished_today) { @object.accomplished_today? }
  attribute(:excused_today) { @object.excused_today? }

  has_one :todays_accomplishment do
    data do
      @object.todays_accomplishment
    end
  end

  has_one :todays_excuse do
    data do
      @object.todays_excuse
    end
  end
end
