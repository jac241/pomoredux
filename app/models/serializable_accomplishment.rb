class SerializableAccomplishment < JSONAPI::Serializable::Resource
  type 'accomplishments'

  attributes :created_at

  belongs_to :goal
end
