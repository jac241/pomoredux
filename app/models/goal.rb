class Goal < ApplicationRecord
  belongs_to :user
  has_many :accomplishments, dependent: :destroy

  validates :title, presence: true

  def accomplished_today?
    accomplishments.created_today.any?
  end
end
