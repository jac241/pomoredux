class DeserializableAccomplishment < JSONAPI::Deserializable::Resource
  has_one :goal
end
