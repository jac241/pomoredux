class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :timer_settings, dependent: :destroy

  before_validation :build_associated_timer_settings

  private

  def build_associated_timer_settings
    build_timer_settings
    true
  end
end
