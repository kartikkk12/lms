class ApplicationController < ActionController::API
  include ActionController::Cookies
  include CurrentUserConcern
#   before_filter :set_access

# def set_access
#   @response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
# end
  # skip_before_action :verify_authenticity_token
end
