class CreateTaskService
  include FlexibleService

  def call(user:, create_params:)
    task = user.tasks.create!(create_params)

    success(:created, task)
  end
end
