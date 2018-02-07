class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :timer_settings, dependent: :destroy
  has_many :tasks, dependent: :destroy
  has_many :pomodoros, through: :tasks
  has_many :goals, dependent: :destroy

  before_validation :build_associated_timer_settings

  private

  def build_associated_timer_settings
    build_timer_settings
    true
  end
end
