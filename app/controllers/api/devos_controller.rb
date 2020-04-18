class Api::DevosController < ApplicationController
    
    def index
        @devos = Devo.all
        render :index
    end

    def show
        @devo = Devo.find(params[:id])
        render :show
    end

    def create
        @devo = Devo.new(devo_params)

        if @devo.save
            render :show
        else
            render json: @devo.errors.full_messages, status: 400
        end
    end

    def destroy
        @devo = devo.Devo(params[:id])
       
        if @devo.delete
            render :show
        else
            render json: ['Unable to delete devo.'], status: 400
        end
    end
    
private

    def devo_params
        params.require(:devo).permit(:day, :book, :chapter, :verse, :title, :passage, :summary, :author, :devotional_id, images: [])
    end

    # def search
    #     search_result = Devo.search_by_keywords(params[:search_keywords])
    
    #     if params[:book] && params[:end_date] && (params[:start_date] != "") && (params[:end_date] != "")
    #         start_date = params[:start_date]
    #         end_date = params[:end_date]
    #         @devos = Devo.search_by_dates(search_result, start_date, end_date)
    #     else
    #         @devos = search_result
    #     end
        
    #     render :index
    # end

end