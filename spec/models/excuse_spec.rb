require 'rails_helper'

describe Excuse do
 it { should belong_to(:goal) }
 it_behaves_like 'creation_date_queryable'
end
