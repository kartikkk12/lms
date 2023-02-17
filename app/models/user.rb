class User < ApplicationRecord
  has_secure_password
  belongs_to :organisation
  has_many :user_journeys
  has_many :journeys, through: :user_journeys
end
