Rails.application.routes.draw do
  namespace :api, constraint: { format: :json } do
    devise_for :users

    resource :timer_settings
    resource :tasks
  end
  root 'dashboard#index'
  get '*path', to: 'dashboard#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
