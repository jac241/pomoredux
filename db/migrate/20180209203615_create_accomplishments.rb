class CreateAccomplishments < ActiveRecord::Migration[5.1]
  def change
    create_table :accomplishments do |t|
      t.datetime :created_at, null: false
    end

    add_reference :accomplishments, :goal, foreign_key: true
  end
end
