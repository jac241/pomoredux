class Task < ActiveRecord::Base
  belongs_to :user
  has_many :pomodoros, dependent: :destroy

  validates :title, :estimated_num_pomodoros, presence: true
  validates :estimated_num_pomodoros, numericality: { only_integer: true,
                                                      greater_than: 0 }

  scope :active, -> { where('completed_at IS NULL') }
end
