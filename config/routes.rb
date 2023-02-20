Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :sessions, only: [:create]

  post 'register', to: 'users#create'
  post 'org/create', to: 'organisations#create'
  delete 'logout', to: 'sessions#logout'
  get 'logged_in', to: 'sessions#logged_in'
  root to: 'users#home'
end
 