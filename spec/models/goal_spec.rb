require 'rails_helper'

describe Goal do
  subject { build(:goal) }
  it { should validate_presence_of(:title) }
  it { should belong_to(:user) }
  it { should have_many(:accomplishments).dependent(:destroy) }

  describe '#accomplished_today?' do
    it 'should return true if there is an accomplishment with todays date' do
      subject.save!
      create(:accomplishment, goal: subject)

      expect(subject.accomplished_today?).to be_truthy
    end

    it 'should return false if no accomplishment with todays date' do
      subject.save!
      create(:accomplishment, created_at: Time.now - 2.days, goal: subject)

      expect(subject.accomplished_today?).to be_falsy
    end
  end
end
