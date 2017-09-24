require 'rails_helper'

describe 'Timer Settings API' do
  let(:user) { create(:user) }

  describe 'PUT /api/timer_settings' do
    let(:update_params) { attributes_for(:non_default_timer_settings) }
    let(:timer_settings) { build(:non_default_timer_settings) }
    let(:results) { double(timer_settings: timer_settings, success: true) }
    let(:service) { double(call: results)}

    context 'signed in' do
      before(:each) { sign_in(user) }

      context 'successful service' do
        before :each do
          allow(UpdateTimerSettingsService).to receive(:new).and_return(service)
        end

        it 'should update the timer settings and return them with status ok' do
          put '/api/timer_settings', params: { timer_setting: update_params }

          expect(response.status).to eq 200
        end
      end

      context 'unsuccessful service' do
        let(:errors) { double(errors: true, full_messages: true) }
        let(:results) { double(success: false, errors: timer_settings.errors)}

        before :each do
          allow(UpdateTimerSettingsService).to receive(:new).and_return(service)
        end

        it 'should return the errors and status 422' do
          put '/api/timer_settings', params: { timer_setting: update_params }

          expect(response.status).to eq 422

          body = JSON.parse(response.body)

          expect(body).to have_key('errors')
          expect(body).to have_key('full_messages')
        end
      end
    end
  end
end
