class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :estimated_num_pomodoros, :completed_at,
    :created_at, :user_id
end
