class SerializableGoal < JSONAPI::Serializable::Resource
  type 'goals'

  attributes :title, :accomplished_today

  attribute :accomplished_today { @object.accomplished_today? }
end
