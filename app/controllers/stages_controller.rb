class StagesController < ApplicationController
  def create
    @stage = Stage.new(params_stage)

    if @stage.save
      render json: @stage, status: :created, stage_created: true
    else
      render json: @stage.errors, status: 500
    end
  end

  private

  def params_stage
    params.require(:stage).permit(:stage_name, :overview_message, :completion_message, :journey_id)
  end
end
