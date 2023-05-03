FactoryBot.define do
  factory :user do
    first_name {'John'}
    last_name {'Doe'}
    user_name {'johndoe'}
    password {'password'}
    password_confirmation {'password'}
    email {'johndoe@example.com'}
    user_access {'user'}
    user_status {'active'}
    association :organisation
  end
end
