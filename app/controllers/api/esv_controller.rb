class Api::EsvController < ApplicationController
    
    def index
        @passages = Esv.all
        render :index
    end

    def show
        @passage = Esv.find(params[:id])
        render :show
    end

    def create
        @passage = Esv.new(passage_params)

        if @passage.save
            render :show
        else
            render json: @passage.errors.full_messages, status: 400
        end
    end

    def destroy
        @passage = Esv.passage(params[:id])
       
        if @passage.delete
            render :show
        else
            render json: ['Unable to delete passage.'], status: 400
        end
    end

end