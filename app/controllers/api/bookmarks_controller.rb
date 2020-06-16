class Api::BookmarksController < ApplicationController
    before_action :require_logged_in!

    def create
        @bookmark = Bookmark.where(user_id: params[:user_id])
        debugger
        if @bookmark == []
        @bookmark = Bookmark.new(bookmark_params)
            debugger
            if @bookmark.save
                render :show
            else
                render json: @bookmark.errors.full_messages, status: 422
            end
        else 
        @bookmark.destroy 

            if @bookmark.destroy 
                render json: :show
            end
        end
    end

private

    def bookmark_params
        params.require(:bookmark).permit(:user_id, :devo_id, :render_day)
    end

end
