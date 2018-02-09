class SerializableGoal < JSONAPI::Serializable::Resource
  type 'goals'

  attributes :title
end
