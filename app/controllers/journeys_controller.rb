class JourneysController < ApplicationController
    def create
        @journey = Journey.new(params_journey)

        if @journey.save
        render json: @journey, status: :created, j_created: true
        else
        render json: @journey.errors, status: 500
        end
    end

    private

    def params_journey
      params.require(:journey).permit(:journey_name, :display_name, :overview_message, :completion_message, :journey_status)
    end
end
