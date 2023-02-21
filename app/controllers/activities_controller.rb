class ActivitiesController < ApplicationController
  def create
    @activity = Activity.new(params_activity)

    if @activity.save
    render json: @activity, status: :created, activity_created: true
    else
    render json: @activity.errors, status: 500
    end
  end 

  private

  def params_activity
    params.require(:activity).permit(:activity_type, :activity_data)
  end
end
