module CreationDateQueryable
  extend ActiveSupport::Concern

  included do
    scope :created_today, -> { where(created_at: (today + 0.second)..(today + 1.day - 1.second)) }
  end

  class_methods do
    def today
      Time.zone.now.to_date
    end
  end
end
