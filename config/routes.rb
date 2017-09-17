Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    devise_for :users
  end
  root 'dashboard#index'
  get '*path', to: 'dashboard#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
