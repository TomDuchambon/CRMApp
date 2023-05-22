class Api::ContactsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    api_key = 'pk_e355852b972afbd7b7a336a07899cb1de2'
    list_id = 'UssCwp'

    data = params[:contact].permit(:firstName, :lastName, :email, :phone, :dob)
    response = send_data_to_klaviyo(api_key, list_id, data)

    render json: response
  end

  private

  def send_data_to_klaviyo(api_key, list_id, data)
    url = "https://a.klaviyo.com/api/v2/list/#{list_id}/members"
    headers = { 'Content-Type' => 'application/json' }
    body = {
      api_key: api_key,
      profiles: [
        {
          email: data[:email],
          first_name: data[:firstName],
          last_name: data[:lastName],
          phone_number: data[:phone],
          date_of_birth: data[:dob]
        }
      ]
    }.to_json

    response = HTTParty.post(url, headers: headers, body: body)

    Rails.logger.info "Klaviyo response: #{response}"
    Rails.logger.info "Klaviyo KEY : #{api_key}"
    { success: response.code == 200 }
  end
end
