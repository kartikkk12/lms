class UsersController < ApplicationController
  def home
    render json: { status: 'hello there' }
  end

  def create
    @user = User.new(params_user)

    if @user.save
      session[:user_id] = @user.id
      render json: @user, status: :created, logged_in: true
    else
      render json: @user.errors, status: 500
    end
  end

  private

  def params_user
    params.require(:user).permit(:first_name, :last_name, :user_name, :password, :password_confirmation, :email,
                                 :user_access, :user_status, :organisation_id)
  end
end
