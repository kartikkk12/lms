class Activity < ApplicationRecord
  has_many :stage_activities
  has_many :stages, through: :stage_activities
end
