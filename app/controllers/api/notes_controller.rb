class Api::NotesController < ApplicationController
    before_action :require_logged_in!

    def index
        @notes = Note.where(notary_id: current_user.id)
        render :index
    end

    def show
        @notes = Note.find(params[:id])
        render :show
    end

    def create
        @notes = Note.new(note_params)
        @notes.notary_id = current_user.id

        if @notes.save
            render :show
        else
            render json: @notes.errors.full_messages, status: 422
        end
    end

    def update
        @notes = Note.find(params[:id])

        if @notes.update(note_params)
            render :show
        else
            render json: @notes.errors.full_messages, status: 422
        end
    end

    def destroy
        @notes = Note.find(params[:id])
        @notes.destory 
        
        if @notes.destroy 
            render json: :show
        end
    end

private

    def note_params
        params.require(:note).permit(:title, :body, :category, :tags)
    end

end
