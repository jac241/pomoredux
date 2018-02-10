class Accomplishment < ApplicationRecord
  belongs_to :goal

  scope :created_today, -> { where(created_at: (today + 0.second)..(today + 1.day - 1.second)) }

  private

  def self.today
    Time.zone.now.to_date
  end
end
