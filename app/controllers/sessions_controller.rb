class SessionsController < ApplicationController
  include CurrentUserConcern

  # login func
  def create
    @user = User.find_by(user_name: params_user[:user_name])

    if @user && @user.authenticate(params_user[:password])
      # session[:user_id] = @user.id
      # cookies[:role] = @user.user_access
      render json: {
        status: :created,
        logged_in: true,
        curr_user: @user
      },
      status: 201
    else
      render json: { error: 'Invalid email or password' }, status: :unprocessable_entity
    end
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        curr_user: @current_user,
        users_name: @curr_user.user_name
      }
    else
      render json: {
        logged_in: false,
        users_name: 'kartikkk'
      }
    end
  end

  def logout
    reset_session
    render json: { status: 200, logged_out: true }
  end

  private

  def params_user
    params.require(:user).permit(:first_name, :last_name, :user_name, :password, :password_confirmation, :email,
                                 :user_access, :user_status, :organisation_id)
  end
end
