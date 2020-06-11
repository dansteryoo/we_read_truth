class Api::BookmarksController < ApplicationController
    before_action :require_logged_in!

    def create
        @bookmark = Bookmark.new(note_params)
        @bookmark.user_id = current_user.id

        if @bookmark.save
            render :show
        else
            render json: @bookmark.errors.full_messages, status: 422
        end
    end

    def destroy
        @notes = Note.find(params[:id])
        @bookmark.destroy 
        
        if @bookmark.destroy 
            render json: :show
        end
    end

private

    def note_params
        params.require(:bookmark).permit(:user_id, :devo_id)
    end

end
