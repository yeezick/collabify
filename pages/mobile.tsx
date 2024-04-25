// import "./MobileGate.scss";
// import { PrimaryButton } from "components/Buttons";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { isMobileWidth } from "@/utils/helpers";

// export const MobileGate = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const rerouteToLanding = () => {
//       if (!isMobileWidth()) {
//         handleRouteToLanding();
//       }
//     };

//     window.addEventListener("resize", rerouteToLanding);
//     return () => {
//       window.removeEventListener("resize", rerouteToLanding);
//     };
//   }, []);

//   const handleRouteToLanding = () => {
//     window.location.replace("https://landing.bootcampr.io/");
//   };

//   return (
//     <div className="mobile">
//       <div className="text">
//         <h2>Important!</h2>
//         <h2>We're not optimized for mobile yet.</h2>
//         <p>
//           Please log in on a desktop or laptop to gain the experience you need
//           to land the job you want.
//         </p>
//       </div>

//       <img />
//       <PrimaryButton
//         text="Visit Bootcampr's homepage"
//         handler={handleRouteToLanding}
//       />
//     </div>
//   );
// };

import React from 'react'

const MobileGate = () => {
  return <div>MobileGate</div>
}

export default MobileGate
