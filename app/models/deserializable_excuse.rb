class DeserializableExcuse < JSONAPI::Deserializable::Resource
  type
  id
  has_one :daily_goal
end
