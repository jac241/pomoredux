Rails.application.routes.draw do
  namespace :api, constraints: { format: :json }, defaults: { format: :json } do
    get '/current_user', to: 'users#show'

    devise_for :users

    resource :timer_settings

    resources :tasks do
      resources :pomodoros
    end

    resources :pomodoros
  end

  resources :goals

  root 'dashboard#index'
  get '*path', to: 'dashboard#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
