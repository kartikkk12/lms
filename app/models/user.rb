class User < ApplicationRecord
  has_secure_password
  validates_uniqueness_of :user_name, on: :create, message: 'must be unique'
  belongs_to :organisation
  has_many :user_journeys
  has_many :journeys, through: :user_journeys
end
