require 'rails_helper'

RSpec.describe "Tags API", type: :request do
  let!(:user) { create(:user, email: "test@naver.com", password: "password", name: "test") }
  let!(:tag) { create(:tag, name: "test_tag") }

  let(:headers) do
    {
      "ACCEPT" => "application/json",
      "Content-Type" => "application/json"
    }
  end

  before(:each) do
    sign_in user
  end

  it "Tagリストの確認" do
    get "/tags.json", headers: headers

    body = JSON.parse(response.body)
    tag_names = body.map { |tag| tag["name"] }
    expect(tag_names).to include("test_tag")
  end
end
