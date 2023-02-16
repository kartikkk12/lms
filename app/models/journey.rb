class Journey < ApplicationRecord
  has_many :user_journeys
  has_many :users, through: :user_journeys
  has_many :stages
  before_save :set_j_last_updated

  private

  def set_j_last_updated
    self.j_last_updated = Time.current
  end
end
