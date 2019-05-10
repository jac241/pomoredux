class Goal < ApplicationRecord
  acts_as_paranoid #without_default_scope: true

  belongs_to :user
  has_many :accomplishments
  has_many :excuses

  validates :title, presence: true
end
