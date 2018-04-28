class CreateExcuses < ActiveRecord::Migration[5.1]
  def change
    create_table :excuses, id: :uuid do |t|
      t.string :description, null: false

      t.timestamps
    end

    add_reference :excuses, :goal, foreign_key: { on_delete: :cascade }
    add_index :excuses, :created_at
  end
end
