class OrganisationsController < ApplicationController
    #create org
    def create
        @org = Organisation.new(params_org)
        if @org.save
            render json: {status: :created}
        else
            render json: {status: 500 }
        end
    end
    private
    def params_org
        params.require(:organisation).permit(:org_name)
    end

end
