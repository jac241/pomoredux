require 'rails_helper'

shared_examples_for 'creation_date_queryable' do
  describe '#created_today' do
    it 'should find records that were created today' do
      factory_name = described_class.name.underscore.to_sym
      today = create(factory_name)
      yesterday = create(factory_name, created_at: Time.now - 2.days)

      expect(described_class.created_today).to include(today)
      expect(described_class.created_today).to_not include(yesterday)
    end
  end
end
