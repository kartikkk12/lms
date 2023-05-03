require 'rails_helper'

require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe "POST #create" do
    context "with valid credentials" do
      it "logs in the user and returns a JSON response with status 201" do
        user = User.create(
          first_name: "John",
          last_name: "Doe",
          user_name: "johndoe",
          password: "password",
          password_confirmation: "password",
          email: "johndoe@example.com",
          user_access: "admin",
          user_status: "active",
          organisation_id: 1
        )
        post :create, params: { user: { user_name: user.user_name, password: user.password } }
        expect(response).to have_http_status(201)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid credentials" do
      it "returns an error message and status 422" do
        post :create, params: { user: { user_name: "invalid", password: "invalid" } }
        expect(response).to have_http_status(422)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(response.body).to include("Invalid email or password")
      end
    end
  end
end
