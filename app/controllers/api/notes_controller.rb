class Api::NotesController < ApplicationController
    before_action :require_logged_in!

    def index
        @notes = Note.all
        render :index
    end

    def show
        @note = Note.find(params[:id])
        render :show
    end

    def create
        @note = Note.new(note_params)
        @note.notary_id = current_user.id

        if @note.save
            render :show
        else
            render json: @note.errors.full_messages, status: 422
        end
    end

    def update
        @note = Note.find(params[:id])

        if @note.update(note_params)
            render :show
        else
            render json: @note.errors.full_messages, status: 422
        end
    end

    def destroy
        @note = Note.find(params[:id])
        @note.destory 
        
        if @note.destroy 
            render json: :show
        end
    end

private

    def note_params
        params.require(:note).permit(:devo_id, :notary_id, :body)
    end

end
