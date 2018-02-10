class DeserializableAccomplishment < JSONAPI::Deserializable::Resource
  type 'accomplishments'

  has_one :goal
end
