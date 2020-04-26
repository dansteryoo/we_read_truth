class Api::DevosController < ApplicationController
    
    def index
        @devos = Devo.where(book: params[:book])
        render :show
    end

    def show
        @devos = Devo.find(params[:id])
        debugger
        render :show
    end

    def book
        @devos = Devo.find_by(book: params[:book])
        debugger
        render :show
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