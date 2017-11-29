class CreatePomodoroService
  include FlexibleService

  def call(user:, task_id:)
    task = user.tasks.find(task_id)
    pomodoro = task.pomodoros.create

    success(:created, pomodoro)
  end
end
