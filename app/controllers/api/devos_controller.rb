class Api::DevosController < ApplicationController
    
    def index
        @devos = Devo.select(:book, :gender).distinct
        render :index
    end

    def show
        @devos = Devo.find(params[:id])
        render :show
    end

    def book
        @devos = Devo.where(book: params[:book], gender: params[:gender])
        render :book
    end
    
private

    def devo_params
        params.require(:devo).permit(:gender, :book, :title, :passages, :summary, :img)
    end


end