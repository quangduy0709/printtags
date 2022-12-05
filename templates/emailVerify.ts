export const htmlString = (content: string) => {
  const html = `<html><body><h3>Thanks for signing up!</h3><br><h3>Your account has been created, you can login with the following credentials after you have activated your account by pressing the url below</h3>
  <br><h4> ------------------------ </h4><br><h3>Please click this button to activate your account: </h3><br> 
 
  <a  href="${content}" style="background-color: #4F64E5; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;"> Verify Email </a>
     
   
       
  </body></html>
   `;
  return html;
};

export const htmlStringForgetPass = (content: string) => {
  const html = `<html><body><h3>Hi</h3><br><h3>You are receiving this email because we received a request to reset the password for your account.</h3><br><h3>Your password is: 123456</h3><br>
  <p>Please login and update your password to ensure information</p>
  </body></html>
   `;
  return html;
};
