class WelcomeEmail < ApplicationMailer
 
  def welcome_email(user)
    @user = user
    mail(to: @user.email, subject: "Welcome #{@user.first_name} to We Read Truth!")
  end
end
