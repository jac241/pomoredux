module ApplicationHelper
  def form_classes(record)
    'ui form'
  end

  def form_field(form, field)
    errors = form.object.errors[field]
    classes = errors.present? ? 'field inline error' : 'field inline'
    haml_tag :div, class: classes do
      yield
    end
  end

  def present(model)
    klass = "#{model.class}Presenter".constantize
    presenter = klass.new(model)
    yield(presenter) if block_given?
  end
end
