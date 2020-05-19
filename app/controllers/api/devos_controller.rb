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
    

    def search
        search_result = Devo.search_by_keywords(params[:search_keywords])
    
        if params[:book] && params[:end_date] && (params[:start_date] != "") && (params[:end_date] != "")
            start_date = params[:start_date]
            end_date = params[:end_date]
            @devos = Devo.search_by_dates(search_result, start_date, end_date)
        else
            @devos = search_result
        end
        
        render :index
    end
    
private

    def devo_params
        params.require(:devo).permit(:gender, :book, :title, :passages, :summary, :img)
    end


end