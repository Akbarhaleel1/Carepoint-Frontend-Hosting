"use client";

import React, { useEffect, useState } from "react";
import StatusDropdown from "../../components/Dropdown/StatusDropdown";
import DateFilterDropdown from "../../components/Dropdown/DateFilterDropdown";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import Image from "next/image";
import Folder from "../../../../../../public/images/folder-icon.png";
import axiosInstance from "@/app/hooks/useApi";
import { Modal, Button } from "antd";

// Define TypeScript interface for user data
interface User {
  _id: string;
  firstname: any;
  lastname: any;
  email: string;
  phonenumber: string;
  isActive: boolean;
  lastVisit: string;
  licenseNumber?: string;
}
interface Doctor {
  _id: string;
  firstname: any;
  lastname: any;
  email: string;
  phonenumber: string;
  isActive: boolean;
  lastVisit: string;
  licenseNumber?: string;
}

interface Appointment {
  _id: string;
  doctor: Doctor;
  users: User | null;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: "online" | "offline";
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

const UserManagement: React.FC = () => {
  const [isStatusOpen, setStatusOpen] = useState(false);
  const [isDateFilterOpen, setDateFilterOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const toggleStatusDropdown = () => {
    setStatusOpen(!isStatusOpen);
    setDateFilterOpen(false);
  };

  const toggleDateFilterDropdown = () => {
    setDateFilterOpen(!isDateFilterOpen);
    setStatusOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get<{ values: User[] }>('/admin-service/getUserManagement');
        const appointmentsResponse = await axiosInstance.get<{ result: Appointment[] }>("/admin-service/userAppoinments");
  
        setUsers(response.data.values);
        setAppointments(appointmentsResponse.data.result);
  
        console.log('user data:', response.data.values);
        console.log('appointments data from API:', appointmentsResponse.data.result);
        console.log('appointments state after set:', appointmentsResponse.data.result); // Check after setting state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUser();
  }, []);
  

  const handleView = (userId: string) => {
    const user = users.find((user) => user._id === userId) || null;
    const filtered = appointments.filter((appointment) => appointment.users?.email === user?.email);
    setSelectedUser(user);
    setFilteredAppointments(filtered);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen p-4 sm:p-6 md:p-8 ">
      <div className="max-w-7xl mx-auto">
        {/* ... (keep the dropdown components as they were) */}

        <div className="mt-10 sm:mt-52">
          <div className="flex justify-between text-white mb-6 px-4 sm:px-6 md:px-8 text-sm sm:text-base font-semibold">
            <h2 className="w-1/3">Name</h2>
            <div className="w-2/3 flex justify-between">
              <h2>Email</h2>
              {/* <h2>Contact</h2> */}
              <h2>Status</h2>
              <h2>Action</h2>
            </div>
          </div>

          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-4 sm:p-6 transition duration-300 hover:bg-opacity-20"
              >
                <div className="flex items-center justify-between">
                  <div className="w-1/3 flex items-center space-x-3">
                    <Image
                      src={Folder}
                      alt="Folder"
                      width={24}
                      height={24}
                      className="hidden sm:block"
                    />
                    <p className="text-white font-medium">{user.firstname} {user.lastname}</p>
                  </div>
                  <div className="w-2/3 flex justify-between items-center">
                    <p className="text-gray-300">{user.email}</p>
                    {/* <p className="text-gray-300">{user.phonenumber}</p> */}
                    {/* <ToggleButton email={user.email} /> */}
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleView(user._id)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
  title={selectedUser ? `Details of ${selectedUser.firstname} ${selectedUser.lastname}` : "Loading..."}
  open={isModalOpen}  // Changed from visible to open
  onCancel={handleModalClose}
  footer={[
    <Button key="back" onClick={handleModalClose}>
      Close
    </Button>,
  ]}
>
  {loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <p><strong>Email:</strong> {selectedUser?.email}</p>
      <p><strong>Phone Number:</strong> {selectedUser?.phonenumber}</p>
      <p><strong>License Number:</strong> {selectedUser?.licenseNumber}</p>

      {filteredAppointments && filteredAppointments.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mt-4">Appointments</h3>
          <ul className="list-disc pl-5 mt-2">
            {filteredAppointments.map((appointment) => (
              <li key={appointment._id}>
                <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.appointmentTime}</p>
                <p><strong>Type:</strong> {appointment.appointmentType}</p>
                <p><strong>Status:</strong> {appointment.status}</p>
                <p><strong>Doctor Name:</strong> {appointment.doctor?.firstname} {appointment.doctor?.lastname}</p>
                <p><strong>Doctor Email:</strong> {appointment.doctor?.email}</p>
                <p><strong>Doctor Phone Number:</strong> {appointment.doctor?.phonenumber}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No appointments available.</p>
      )}
    </div>
  )}
</Modal>

    </div>
  );
};

export default UserManagement;