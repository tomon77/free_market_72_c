Rails.application.routes.draw do
  devise_for :users
  root "tops#index"
    resources :users ,only: [:index, :new, :show] do
      member do
        get 'credit_new', to: 'users#credit_new'
        get 'credit_create', to: 'users#credit_create'
        get 'credit_show', to: 'users#credit_show'
        delete 'credit_destroy', to: 'users#credit_destroy'
      end
      resources :destinations ,only: [:index, :new, :create, :edit, :update]
    end
  resources :logs ,only: :index
  resources :products do
    collection do
      get 'purchase'
    end
    # :idなし
    collection do
      get 'get_product_category_children', defaults: { format: 'json' }
      get 'get_product_category_grandchildren', defaults: { format: 'json' }
    end
    # :idあり
    member do
      get 'get_product_category_children', defaults: { format: 'json' }
      get 'get_product_category_grandchildren', defaults: { format: 'json' }
    end
  end
  resources :credit_cards, only:[:new, :create, :show, :destroy] do
    # member do
    #   get 'new', to: 'credit_cards#new'
    #   post 'create', to: 'credit_cards#create'
    #   get 'show', to: 'credit_cards#show'
    #   delete 'destroy', to: 'credit_cards#destroy'
    # end
  end
end
