class Accomplishment < ApplicationRecord
  include CreationDateQueryable

  belongs_to :goal, -> { with_deleted }
end
