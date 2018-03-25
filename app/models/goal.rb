class Goal < ApplicationRecord
  belongs_to :user
  has_many :accomplishments, dependent: :destroy

  validates :title, presence: true

  def accomplished_today?
    todays_accomplishment.present?
  end

  def todays_accomplishment
    accomplishments.created_today.last
  end
end
