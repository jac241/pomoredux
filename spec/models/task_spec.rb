require 'rails_helper'

describe Task do
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:estimated_num_pomodoros)}
  it do
    should validate_numericality_of(:estimated_num_pomodoros)
            .only_integer
            .is_greater_than(0)
  end

  it { should have_many(:pomodoros).dependent(:destroy) }
  it { should belong_to(:user) }

  describe '#active' do
    it 'should only return tasks that are not completed' do
      task = create(:task)
      completed_task = create(:completed_task)

      expect(described_class.active).to include(task)
      expect(described_class.active).to_not include(completed_task)
    end
  end
end
