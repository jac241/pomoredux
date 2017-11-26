Rails.application.routes.draw do
  namespace :api, constraints: { format: :json }, defaults: { format: :json } do
    devise_for :users

    resource :timer_settings
    resources :tasks
  end
  root 'dashboard#index'
  get '*path', to: 'dashboard#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
