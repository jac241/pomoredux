class UpdateTaskService
  include FlexibleService

  def call(user:, params:)
    task = task(user: user, task_id: params[:id])

    task.update!(params)

    success(:updated, task)
  end

  private

  def task(user:, task_id:)
    user.tasks.find(task_id)
  end
end
