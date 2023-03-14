Rails.application.routes.draw do
  get 'activities/create'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :sessions, only: [:create]

  post 'register', to: 'users#create'
  post 'org/create', to: 'organisations#create'
  delete 'logout', to: 'sessions#logout'
  get 'logged_in', to: 'sessions#logged_in'
  post 'login', to: 'sessions#create'
  post 'journey/create', to: 'journeys#create'
  post 'journey/create2', to: 'journeys#create2'
  post 'activity/create', to: 'activities#create'
  get 'journey/showall', to: 'journeys#showall'
  get 'user/show', to: 'users#show'
  root to: 'users#home'
  get 'logout', to: 'sessions#logout'
  get 'details/:id', to: 'journeys#show'
end
 