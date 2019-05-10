class Excuse < ApplicationRecord
  include CreationDateQueryable

  belongs_to :goal, -> { with_deleted }

  validates :description, presence: true
end
