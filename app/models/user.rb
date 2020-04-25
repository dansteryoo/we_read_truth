class User < ApplicationRecord

    validates :password, length: { minimum: 6, allow_nil: true }
    validates :password_digest, :session_token, presence: true
    validates :email, :first_name, :last_name, presence: true 
    validates :email, uniqueness: true 

    after_initialize :ensure_session_token

    has_many :notes,
        primary_key: :id,
        foreign_key: :notary_id,
        class_name: :Note,
        dependent: :destroy

    attr_reader :password

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil if user.nil?
        user.is_password?(password) ? user : nil
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end
    
    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end
    
    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64(16)
        self.save!
        self.session_token
    end

 private

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64(16)
    end
end
