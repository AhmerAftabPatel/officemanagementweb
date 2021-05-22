
const pwdChangeSuccessMsgData = {
    header: 'Success!',
    content: 'Your password has been changed successfully',
  };
  const pwdChangeFailMsgData = {
    header: 'Password change failed!',
    content: 'Current password entered is incorrect',
  };
  const generalFailMsgData = {
    header: 'OOPS!',
    content: 'Something went wrong. Please try again',
  };
  const loginFailMsgData = {
    header: 'Login failed!',
    content: 'Invalid Mobile number or Password',
  };
  
  const activationFailureMsgData = {
    header: 'Activation failed!',
    content: 'Mobile Number verification pending',
  };
  
  const signUpFailMsgData = {
    header: 'Sign up failed!',
    content: 'Something went wrong. Please try again',
  };
  const resetPwdFailMsgData = {
    header: 'Reset Password failed!',
    content: 'OTP entered is incorrect',
  };
  const otpSuccessMsgData = {
    header: 'OTP Sent!',
    content: 'OTP has been sent to your mobile number',
  };
  const pwdResetSuccessMsgData = {
    header: 'Password reset!',
    content: 'Your password has been reset successfully',
  };
  
  const OTPFailureMsgData = {
    header: 'Password reset!',
    content: 'Wrong OTP Entered',
  };
  
  const userSucessMessageData = {
    header: 'Signup Registeration!',
    content: 'User Account Registered Successfully',
  };
  
  const userActivateSucessMessageData = {
    header: 'Signup Registeration!',
    content: 'User Account Activated Successfully',
  };
  
  const itemAddedToCartSuccessfulMsg = {
    header: '',
    content: 'Items Added to Cart successful',
  };
  
  const itemAddedToCartFailureMsg = {
    header: '',
    content: 'Item alreday added to cart',
  };
  
  const emptyCartAddressMessage = {
    header: '',
    content: 'Select/Add atleaset one Address',
  };
  
  const userUpdateSuccMsg = {
    header: '',
    content: 'User Profile Updated Successfully',
  };
  
  const imageUploadSuccMsg = {
    header: '',
    content: 'Image Uploaded Successfully',
  };
  
  const imageUploadFailueMsg = {
    header: '',
    content: 'Select Atleast One Image',
  };
  
  const imageUploadFileFormatsFailueMsg = {
    header: '',
    content: 'Validation failed: Image url You are not allowed to upload pdf files, allowed types: jpg, jpeg, gif, png',
  };
  
  const imageUploadSizeFailueMsg = {
    header: '',
    content: 'You cannot upload an file greater than 1 MB',
  };
  
  const pagmentPageFailureMsg = {
    header: '',
    content: 'No item exists in cart',
  };
  
  const invalidMobNumMsg = 'Please enter a valid mobile number';
  const emptyPasswordMsg = 'Please enter your password';
  const emptyMobNumMsg = 'Please enter your registered mobile number';
  const emptyCurrPassMsg = 'Please enter current password';
  const emptyOTPMsg = 'Please enter OTP received on your mobile';
  const requiredFieldMsg = 'This is a required field';
  const invalidPwdFormatMsg = 'Password should contain alphanumeric, uppercase, lowercase & greater than 8 characters';
  const invalidConfPwdMsg = 'Passwords do not match';
  const invalidOTPMsg = 'This is not a valid OTP';
  const invalidNameMsg = 'Special characters or numbers not allowed';
  const invalidEmailMsg = 'Please enter a valid Email address';
  const invalidPincodeMsg = 'Please enter a valid Pincode';
  
  
  export {
    pwdChangeSuccessMsgData,
    pwdChangeFailMsgData,
    generalFailMsgData,
    loginFailMsgData,
    signUpFailMsgData,
    resetPwdFailMsgData,
    otpSuccessMsgData,
    pwdResetSuccessMsgData,
    invalidMobNumMsg,
    emptyPasswordMsg,
    emptyMobNumMsg,
    emptyCurrPassMsg,
    emptyOTPMsg,
    requiredFieldMsg,
    invalidPwdFormatMsg,
    invalidConfPwdMsg,
    invalidOTPMsg,
    invalidNameMsg,
    invalidEmailMsg,
    invalidPincodeMsg,
    activationFailureMsgData,
    OTPFailureMsgData,
    userSucessMessageData,
    userActivateSucessMessageData,
    itemAddedToCartSuccessfulMsg,
    itemAddedToCartFailureMsg,
    emptyCartAddressMessage,
    userUpdateSuccMsg,
    imageUploadSuccMsg,
    imageUploadFailueMsg,
    imageUploadFileFormatsFailueMsg,
    imageUploadSizeFailueMsg,
    pagmentPageFailureMsg,
  };
  