class Task < ActiveRecord::Base
  belongs_to :user
  has_many :pomodoros, dependent: :destroy

  validates :title, :estimated_num_pomodoros, presence: true
  validates :estimated_num_pomodoros, numericality: { only_integer: true,
                                                      greater_than: 0 }

  scope :active, -> { where('tasks.completed_at IS NULL') }
  scope :in_order_created, -> { order(created_at: :desc) }

  def completed=(was_completed)
    if was_completed
      self.completed_at = Time.now
    else
      self.completed_at = nil
    end
  end
end
