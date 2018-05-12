module Components
  class ExcuseModal
    include Capybara::DSL
    include Pages::Helpers

    def create_excuse_for(excuse, excusable:)
      within('#new_excuse') do
        fill_out_and_save_excuse_form(excuse)
      end
    end

    def fill_out_and_save_excuse_form(excuse)
      fill_in 'description', with: ''
      fill_in 'description', with: excuse.description
      click_on 'Save'
    end

    def has_excuse?(excuse)
      within(selector_for(excuse)) do
        find_field('description').value == excuse.description
      end
    end

    def update_excuse(excuse)
      within(selector_for(excuse)) do
        fill_out_and_save_excuse_form(excuse)
      end
    end

    def close
      find('i.close').click
    end
  end
end

