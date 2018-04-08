class Goal < ApplicationRecord
  belongs_to :user
  has_many :accomplishments, dependent: :destroy

  validates :title, presence: true
end
