import React, { useState } from 'react';
import { Bell, Video, X } from 'lucide-react';

const NotificationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, doctor: "Dr. Smith", timestamp: new Date().toLocaleTimeString() }
  ]);

  const handleAccept = (id:any) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    // Here you would typically trigger the video call acceptance logic
    console.log(`Accepted call from notification ${id}`);
  };

  const handleDismiss = (id:any) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        <Bell size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Notifications</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            {notifications.length === 0 ? (
              <p className="text-gray-500">No new notifications</p>
            ) : (
              <ul>
                {notifications.map((notif) => (
                  <li key={notif.id} className="mb-4 p-4 border rounded-lg">
                    <p className="font-semibold">{notif.doctor} is requesting a video call</p>
                    <p className="text-sm text-gray-500 mb-2">Received at {notif.timestamp}</p>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleAccept(notif.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center"
                      >
                        <Video size={16} className="mr-2" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleDismiss(notif.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Dismiss
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationModal;