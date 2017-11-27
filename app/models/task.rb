class Task < ActiveRecord::Base
  belongs_to :user

  validates :title, :estimated_num_pomodoros, presence: true
  validates :estimated_num_pomodoros, numericality: { only_integer: true,
                                                      greater_than: 0 }
end
