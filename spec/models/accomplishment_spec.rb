require 'rails_helper'

describe Accomplishment do
  it { should belong_to(:goal) }

  describe '#created_today' do
    it 'should find accomplishments created today' do
      today = create(:accomplishment)
      yesterday = create(:accomplishment, created_at: Time.now - 2.days)

      expect(described_class.created_today).to include(today)
      expect(described_class.created_today).to_not include(yesterday)
    end
  end
end
