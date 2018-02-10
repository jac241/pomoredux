class AddIndexToAccomplishmentsOnCreatedAt < ActiveRecord::Migration[5.1]
  def change
    add_index :accomplishments, :created_at
  end
end
