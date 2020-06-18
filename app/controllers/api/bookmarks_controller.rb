class Api::BookmarksController < ApplicationController
    before_action :require_logged_in!

    def index
        @bookmark = Bookmark.where(user_id: current_user.id)

        render :index
    end

    def create
        @bookmark = Bookmark.where(user_id: current_user.id)
        
        if @bookmark == []
            @bookmark = Bookmark.new(bookmark_params)
                
            render :show if @bookmark.save
        else 
        @bookmark.destroy_all
            @bookmark = Bookmark.new(bookmark_params)
                
            render :show if @bookmark.save
        end
    end

    def destroy
        @bookmark = Bookmark.find(params[:id])
        @bookmark.destroy
        
        render json: :show
    end

private

    def bookmark_params
        params.require(:bookmark).permit(:user_id, :devo_id, :render_day, :gender, :book)
    end

end
