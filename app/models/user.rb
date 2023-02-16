class User < ApplicationRecord
  has_secure_password
  has_many :user_journeys
  has_many :journeys, through: :user_journeys
end
