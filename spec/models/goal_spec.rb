require 'rails_helper'

describe Goal do
  it { should validate_presence_of(:title) }
  it { should belong_to(:user) }
end
