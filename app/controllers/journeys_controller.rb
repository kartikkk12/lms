class JourneysController < ApplicationController
  # def create
  #     @journey = Journey.new(params_journey)
  #     if @journey.save
  #       if params[:stages]
  #         params[:stages].each do |params_stage|
  #           @stage= @journey.stages.new(params_stage.permit(:stage_name, :overview_message, :completion_message))
  #           if @stage.save

  #           else
  #             # @journey.destroy
  #             render json: {message: 'could not be created stage'}, status: :unprocessable_entity
  #             return
  #           end
  #         end
  #       end
  #       render json: @journey, status: :created

  #     else
  #     render json: @journey.errors, status: 500
  #     end
  #     # if params[:activities]
  #     #   params[:activities].each do |x|
  #     #     @activity=Activity.create(x.permit(:activity_type, :activity_data))

  #     # end
  #   end
  # end
  def create
    ActiveRecord::Base.transaction do
      @journey = Journey.new(params_journey)
      if @journey.save
        if params[:stages]
          params[:stages].each do |params_stage|
            @stage = @journey.stages.new(params_stage.permit(:stage_name, :overview_message, :completion_message))
            raise ActiveRecord::Rollback, 'could not be created stage' unless @stage.save
          end
        end

        render json: @journey, status: :created
      else
        render json: @journey.errors, status: 500
      end

    rescue ActiveRecord::Rollback => e
      render json: { message: e.message }, status: :unprocessable_entity
    end
  end

  def create2
    ActiveRecord::Base.transaction do
      @journey = Journey.new(params_journey)
      if @journey.save
        if params[:stages]
          params[:stages].each do |params_stage|
            @stage = @journey.stages.new(params_stage.permit(:stage_name, :overview_message, :completion_message))
            raise ActiveRecord::Rollback, 'could not create stage' unless @stage.save

            next unless params_stage[:activities]

            params_stage[:activities].each do |params_activity|
              @activity = Activity.new(params_activity.permit(:activity_type, :activity_data))
              raise ActiveRecord::Rollback, 'could not create activity' unless @activity.save

              @stage.activities << @activity
            end
          end
        end

        render json: @journey, status: :created
      else
        render json: @journey.errors, status: 500
      end

    rescue ActiveRecord::Rollback => e
      render json: { message: e.message }, status: :unprocessable_entity
    end
  end

  def showall
    @journeys = Journey.all
    render json: @journeys
  end

  # def show
  #   @journey= Journey.find(params[:id])
  #   render json: @journey, include: [:stages]
  # end
  def show
    @journey = Journey.find(params[:id])
    render json: @journey, include: { stages: { include: :activities } }
  end



  # def params_stages
  #   params.require(:stage).permit(:stage_name, :overview_message, :completion_message)
  # end


  private

  def params_journey
    params.require(:journey).permit(:journey_name, :display_name, :overview_message, :completion_message,
                                    :journey_status)
  end
end
