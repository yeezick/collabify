// import './UpdateEmailConfirmation.scss'
// import { useLocation } from 'react-router-dom'
// import { getEncodedEmail } from '../SignIn/SignIn'
// import { UpdateEmailAddressLink } from '../../../components/UpdateEmailAddressLink/UpdateEmailAddressLink'
// import { useState } from 'react'

// export const UpdateEmailConfirmation = () => {
//   const pathInfo = useLocation()
//   const { newEmail } = getEncodedEmail(pathInfo)
//   const [email, setEmail] = useState(newEmail)

//   return (
//     <div className='email-confirmation-container'>
//       <p className='message-content header'>
//         You've updated your email address!
//       </p>
//       <p className='message-content subheader'>
//         We sent a confirmation email to <span>{email}</span>.
//       </p>
//       <div className='message-content text'>
//         <p>It may be in your junk or spam folder.</p>
//       </div>
//       <div className='message-content confirm'>
//         <p>Confirm your updated email address to log in.</p>
//       </div>
//       <div className='message-content update-email'>
//         <UpdateEmailAddressLink setEmail={setEmail} />
//         <span> if it's incorrect.</span>
//       </div>
//     </div>
//   )
// }

import React from "react";

const UpdateEmailConfirmation = () => {
  return <div>UpdateEmailConfirmation</div>;
};

export default UpdateEmailConfirmation;
