class DeserializableExcuse < JSONAPI::Deserializable::Resource
  attributes :description

  belongs_to :daily_goal
end
