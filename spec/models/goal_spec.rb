require 'rails_helper'

describe Goal do
  it { should validate_presence_of(:title) }
end
