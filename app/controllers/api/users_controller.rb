class Api::UsersController < ApplicationController
    before_action :require_logged_in!, only: [:show]

    def index
        @user = User.all
    end

    def show
        @user = User.find(params[:id])
        render :show
    end

    def create
        @user = User.new(user_params)
        if @user.save
            WelcomeEmail.welcome_email(@user).deliver_now
            log_in!(@user)
            render :show
        else 
            render json: @user.errors.full_messages, status: 422
        end
    end

    def update
        @user = User.find(params[:id])

        if @user.update(user_params)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def destroy
        @user = User.find(params[:id])
        @user.destroy 
        
        if @user.destroy 
            render json: {}
        else
            render json: ["Current user is not logged in"], status: 404
        end
    end

private
    
    def user_params
        params.require(:user).permit(:password, :email, :first_name, :last_name)
    end

end
