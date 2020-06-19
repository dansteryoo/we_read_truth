Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :create, :update, :destroy]
    resource :session, only: [:create, :destroy]
    resources :devos, only: [:index, :show]
    resources :notes, only: [:index, :show, :create, :update, :destroy]
    resources :bookmarks, only: [:index, :create, :destroy]
    get '/search', to: 'devos#search'
    get '/book', to: 'devos#book'
    post 'password/forgot', to: 'password#forgot'
    post 'password/reset', to: 'password#reset'
  end

  root 'static_pages#root'
end
