require 'rails_helper'

RSpec.describe Mutations::SignInMutation, type: :request do
  describe '.resolve' do
    it 'returns token' do
      user = create(:user)
      post '/graphql', params: { query: query(email: user.email) }
      json = JSON.parse(response.body)
      data = json['data']['signIn']

      expect(data).to include(
        'token' => be_present,
        'user'  => { 'id' => user.id.to_s }
      )
    end
  end

  def query(email:)
    <<-GQL
          mutation {
            signIn(email: "#{email}") {
              token
              user {
                id
              }
            }
          }
    GQL
  end
end