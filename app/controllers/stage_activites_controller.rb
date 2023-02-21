class StageActivitesController < ApplicationController

    #add button from selected
    def add
        @row = StageActivity.new(params_st_act)
        if @row.save
            render json: {status: added} , status: :ok
        else
            render json: {status: failed}, status:unprocessable_entity
        end
    end

    #create and add to stage
    def create
        @activity = Activity.new(params_activity)   #might give error

        if @activity.save
            render json: {status: done}
            @row = StageActivity.new(params_st_act)
            if @row.save
                render json: {status: added} , status: :ok
            else
                render json: {status: failed}, status: :unprocessable_entity
            end
        else
            render json: status: :unprocessable_entity
        end
        

    end

    private

    def params_st_act
        params.require(:row).permit(:activity_id,:stage_id)

    end
end
