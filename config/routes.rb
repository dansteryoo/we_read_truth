Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :show, :create]
    resource :session, only: [:create, :destroy]
    resources :devos, only: [:index, :show]
    resources :notes, only: [:index, :show, :create, :destroy, :update]
    get '/search', to: 'devos#search'
    get '/book', to: 'devos#book'
  end

  root 'static_pages#root'
end
