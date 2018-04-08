require 'rails_helper'

describe Goal do
  subject { build(:goal) }
  it { should validate_presence_of(:title) }
  it { should belong_to(:user) }
  it { should have_many(:accomplishments).dependent(:destroy) }
end
