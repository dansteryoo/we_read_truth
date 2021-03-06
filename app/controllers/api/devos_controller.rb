class Api::DevosController < ApplicationController
    before_action :require_logged_in!

    def index
        @devos = Devo.select(:book, :gender)
        @devos = @devos.uniq { |each| each.values_at(:book, :gender) }
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