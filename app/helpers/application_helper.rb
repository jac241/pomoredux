module ApplicationHelper
  def form_classes(record)
    #record.errors.present? ? 'ui form error' : 'ui form'
    'ui form'
  end

  def form_field(form, field)
    errors = form.object.errors[field]
    classes = errors.present? ? 'field error' : 'field'
    haml_tag :div, class: classes do
      yield
      if errors.present?
        haml_tag(:div, errors.join(','), {
          class: 'ui basic red pointing prompt label',
          data: { behavior: 'validated-label'}
        })
      end
    end
  end
end
