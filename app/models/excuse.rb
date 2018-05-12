class Excuse < ApplicationRecord
  include CreationDateQueryable

  belongs_to :goal

  validates :description, presence: true
end
