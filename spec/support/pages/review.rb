module Pages
  class Review
    include Capybara::DSL

    attr_reader :date

    def initialize(date)
      @date = date
    end

    def visit_page
      visit "/reviews/#{date.strftime("%Y-%m-%d")}"
    end

    def has_goal?(goal)
      within("#completed_daily_goals") do
        has_content?(goal.title)
      end
    end
  end
end
