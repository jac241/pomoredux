require 'rails_helper'

describe User, type: :model do
  it { should have_many(:goals).dependent(:destroy) }
  it { should have_many(:accomplishments).through(:goals) }

  describe '#create' do
    it 'should build an associated timer settings before creation' do
      user = described_class.new(email: 'j@c.com', password: 'mypassword')
      user.save!

      expect(user.timer_settings).to_not be_nil
    end
  end
end
