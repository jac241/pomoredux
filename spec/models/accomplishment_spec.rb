require 'rails_helper'

describe Accomplishment do
  it { should belong_to(:goal) }
  it_behaves_like 'creation_date_queryable'
end
