class Excuse < ApplicationRecord
  include CreationDateQueryable

  belongs_to :goal
end
