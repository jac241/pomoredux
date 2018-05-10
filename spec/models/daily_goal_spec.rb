require 'rails_helper'

describe DailyGoal do
  describe 'self.all_for_user' do
    let(:user) { create(:user) }
    let(:goals) { create_list(:goal, 2, user: user) }

    context 'one goal has an accomplishment' do
      it 'should build daily goals for the passed user with accomplishments' do
        accomplishment = create(:accomplishment, goal: goals.first)

        daily_goals = described_class.all_for_user(user)

        expect(daily_goals.count).to eq 2

        expect(daily_goals.first.goal).to eq goals.first
        expect(daily_goals.first.todays_accomplishment).to eq accomplishment
        expect(daily_goals.first.todays_excuse).to eq nil

        expect(daily_goals.second.goal).to eq goals.second
        expect(daily_goals.second.todays_accomplishment).to eq nil
        expect(daily_goals.second.todays_excuse).to eq nil
      end
    end

    context 'one goal has an excuse' do
      it 'should build daily goals for the passed user with excuse' do
        excuse = create(:excuse, goal: goals.first)

        daily_goals = described_class.all_for_user(user)

        expect(daily_goals.count).to eq 2

        expect(daily_goals.first.goal).to eq goals.first
        expect(daily_goals.first.todays_excuse).to eq excuse
        expect(daily_goals.first.todays_accomplishment).to eq nil

        expect(daily_goals.second.goal).to eq goals.second
        expect(daily_goals.second.todays_accomplishment).to eq nil
        expect(daily_goals.second.todays_excuse).to eq nil
      end
    end
  end

  let(:goal) { build(:goal) }
  let(:accomplishment) { build(:accomplishment, goal: goal) }
  let(:excuse) { build(:excuse, goal: goal) }

  subject do
    described_class.new(goal: goal, todays_accomplishment: accomplishment)
  end

  describe '#accomplished_today?' do
    it 'should return true if there is an accomplishment' do
      expect(subject.accomplished_today?).to be_truthy
    end

    it 'should return false if no accomplishment with todays date' do
      daily_goal = DailyGoal.new(goal: build(:goal), todays_accomplishment: nil)
      expect(daily_goal.accomplished_today?).to be_falsy
    end
  end

  describe '#excused_today?' do
    context 'has an excuse' do
      subject do
        described_class.new(goal: goal, todays_excuse: excuse)
      end

      it 'should return true' do
        expect(subject.excused_today?).to be_truthy
      end
    end

    context 'has no excuse' do
      it 'shold return falsey' do
        expect(subject.excused_today?).to be_falsey
      end
    end
  end

  describe '#persisted?' do
    it 'should delegate to goal' do
      expect(subject.persisted?).to eq goal.persisted?

      goal.save!

      expect(subject.persisted?).to eq true
    end
  end
end
