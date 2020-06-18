class WelcomeEmail < ApplicationMailer
 
  def send_welcome
    @user = params[:user]
    mail(to: @user.email, subject: "Welcome #{@user.first_name} to We Read Truth!")
  end
end
