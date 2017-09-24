class ActiveModel::ErrorsSerializer < ActiveModel::Serializer
  attributes :errors, :full_messages

  def errors
    object
  end

  def full_messages
    object.full_messages
  end
end
