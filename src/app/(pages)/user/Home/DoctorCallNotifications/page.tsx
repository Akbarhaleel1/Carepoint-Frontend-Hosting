import React, { useState } from 'react';
import { Bell, Phone, X } from 'lucide-react';

const DoctorCallNotification = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleAccept = () => {
    // Handle accept logic here
    console.log('Call accepted');
    closeModal();
  };

  const handleReject = () => {
    // Handle reject logic here
    console.log('Call rejected');
    closeModal();
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        <Bell size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Incoming Call</h2>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>
            <div className="mb-6 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Phone size={32} className="text-blue-500" />
              </div>
              <p className="text-lg font-semibold text-gray-700">Dr. John Doe</p>
              <p className="text-sm text-gray-500">is calling you</p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorCallNotification;