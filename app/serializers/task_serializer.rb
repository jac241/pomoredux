class TaskSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :estimated_num_pomodoros, :completed_at,
    :created_at, :user_id, :links

  def links
    {
      self: api_task_path(object),
      pomodoros: api_task_pomodoros_path(object)
    }
  end
end
