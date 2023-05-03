require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  describe 'validations' do
    it { should validate_uniqueness_of(:user_name).on(:create).with_message('must be unique') }
  end

  describe 'associations' do
    it { should belong_to(:organisation) }
    it { should have_many(:user_journeys) }
    it { should have_many(:journeys).through(:user_journeys) }
  end

  describe 'password' do
    it { should have_secure_password }
  end

  describe 'factories' do
    it 'has a valid factory' do
      expect(build(:user)).to be_valid
    end
  end
end
