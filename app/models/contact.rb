class Contact < ApplicationRecord
  validates :firstName, presence: true
  validates :lastName, presence: true
  validates :email, presence: true
  validates :phone, presence: true
  validates :dob, presence: true
end
