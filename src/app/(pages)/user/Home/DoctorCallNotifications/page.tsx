// import React, { useState } from 'react';

// const DoctorCallNotification = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="font-sans">
//       <button
//         onClick={() => setIsOpen(true)}
//         className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
//       >
//         Notify
//       </button>

//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg p-6 m-4 max-w-sm w-full">
//             <h2 className="text-xl font-bold mb-4">Incoming Call</h2>
//             <p className="mb-4">Dr. John Doe is calling you</p>
//             <div className="flex justify-between">
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//               >
//                 Reject
//               </button>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="px-4 py-2 bg-green-500 text-white rounded"
//               >
//                 Accept
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorCallNotification;