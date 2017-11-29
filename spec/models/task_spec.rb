require 'rails_helper'

describe Task do
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:estimated_num_pomodoros)}
  it do
    should validate_numericality_of(:estimated_num_pomodoros)
            .only_integer
            .is_greater_than(0)
  end

  it { should have_many(:pomodoros) }
  it { should belong_to(:user) }
end
