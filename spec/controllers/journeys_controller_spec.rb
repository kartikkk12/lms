require 'rails_helper'

RSpec.describe JourneysController, type: :controller do
  describe "POST #create2" do
    context "with valid parameters" do
      let(:journey_params) {
        {
          journey_name: "Test Journey",
          display_name: "Test Display Name",
          overview_message: "Test Overview Message",
          completion_message: "Test Completion Message",
          journey_status: "active"
        }
      }
      let(:stages_params) {
        [
          {
            stage_name: "Test Stage 1",
            overview_message: "Test Overview Message for Stage 1",
            completion_message: "Test Completion Message for Stage 1",
            activities: [
              { activity_type: "Test Activity 1", activity_data: "Test Activity Data 1" },
              { activity_type: "Test Activity 2", activity_data: "Test Activity Data 2" }
            ]
          },
          {
            stage_name: "Test Stage 2",
            overview_message: "Test Overview Message for Stage 2",
            completion_message: "Test Completion Message for Stage 2",
            activities: [
              { activity_type: "Test Activity 3", activity_data: "Test Activity Data 3" },
              { activity_type: "Test Activity 4", activity_data: "Test Activity Data 4" }
            ]
          }
        ]
      }

      it "creates a new journey and associated stages and activities" do
        expect {
          post :create2, params: { journey: journey_params, stages: stages_params }
        }.to change(Journey, :count).by(1)
         .and change(Stage, :count).by(2)
         .and change(Activity, :count).by(4)
      end

      it "returns a JSON response with status 201 and the new journey object" do
        post :create2, params: { journey: journey_params, stages: stages_params }
        expect(response).to have_http_status(201)
        expect(JSON.parse(response.body)).to include(
          "id" => Journey.last.id,
          "journey_name" => "Test Journey",
          "display_name" => "Test Display Name",
          "overview_message" => "Test Overview Message",
          "completion_message" => "Test Completion Message",
          "journey_status" => "active"
        )
      end
    end

    context "with invalid parameters" do
      let(:invalid_params) { { journey_name: "", display_name: "", overview_message: "" } }

      it "does not create a new journey" do
        expect {
          post :create2, params: { journey: invalid_params }
        }.to_not change(Journey, :count)
      end

      it "returns a JSON response with status 422 and error messages" do
        post :create2, params: { journey: invalid_params }
        expect(response).to have_http_status(422)
        expect(JSON.parse(response.body)).to eq({ "error" => "journey name, overview message or completetion message cannot be empty"})
      end
    end
  end

  describe "GET #showall" do
    it "returns a JSON response with all journeys" do
      journey1 = Journey.create(journey_name: "Journey 1")
      journey2 = Journey.create(journey_name: "Journey 2")

      get :showall
      expect(response).to have_http_status(200)
    end
  end
end
