module Pages
  module Helpers
    include ActionView::Helpers

    def selector_for(record)
      "##{dom_id(record)}"
    end
  end
end
