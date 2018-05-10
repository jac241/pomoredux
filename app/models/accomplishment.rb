class Accomplishment < ApplicationRecord
  include CreationDateQueryable

  belongs_to :goal
end
