class CreateTaskService
  include FlexibleService

  def call(user:, create_params:)
    task = user.tasks.new(create_params)

    if task.save
      success(:created, task)
    else
      failure(:invalid_params, task)
    end
  end
end
