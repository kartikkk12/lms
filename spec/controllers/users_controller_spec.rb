require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET #home' do
    it 'returns a JSON response with a status message' do
      get :home
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to eq({ 'status' => 'hello there' })
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
        organization = Organisation.create(org_name: 'Cerner-Northgate')
      let(:valid_params) do
        {
          user: {
            first_name: 'John',
            last_name: 'Doe',
            user_name: 'johndoe',
            password: 'password',
            password_confirmation: 'password',
            email: 'johndoe@example.com',
            user_access: 'user',
            user_status: 'active',
            organisation_id: organization.id
          }
        }
      end

      it 'creates a new user' do
        expect do
          post :create, params: valid_params
        end.to change(User, :count).by(1)
      end

      it 'returns a JSON response with the created user' do
        post :create, params: valid_params
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)).to include('id', 'first_name', 'last_name', 'user_name', 'email',
                                                      'user_access', 'user_status', 'organisation_id')
      end
    end

    context 'with invalid params' do
      let(:invalid_params) do
        {
          user: {
            first_name: nil,
            last_name: nil,
            user_name: nil,
            password: nil,
            password_confirmation: nil,
            email: nil,
            user_access: nil,
            user_status: nil,
            organisation_id: nil
          }
        }
      end

      it 'does not create a new user' do
        expect do
          post :create, params: invalid_params
        end.to_not change(User, :count)
      end

      it 'returns a JSON response with errors' do
        post :create, params: invalid_params
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(response).to have_http_status(500)
      end
    end
  end

  describe 'GET #show' do
    it 'returns a JSON response with all users' do
      User.create(first_name: 'John', last_name: 'Doe', user_name: 'johndoe', password: 'password',
                  password_confirmation: 'password', email: 'johndoe@example.com', user_access: 'user',
                  user_status: 'active', organisation_id: 1)
      get :show
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to be_an_instance_of(Array)
      expect(JSON.parse(response.body).size).to eq(1)
    end
  end
end
