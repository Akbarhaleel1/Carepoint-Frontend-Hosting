// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Sidebar,
//   SidebarBody,
//   SidebarLink,
// } from "../../../../components/ui/sidebar";
// import {
//   IconArrowLeft,
//   IconBrandTabler,
//   IconSettings,
//   IconUserBolt,
// } from "@tabler/icons-react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { cn } from "@/app/utils/util";
// import PieChart from "../components/PieChart";
// import { useRouter } from "next/navigation";
// import { setDoctorData } from "@/redux/yourSlice";
// import { useDispatch } from "react-redux";

// export function SidebarDemo() {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);
//   const token = localStorage.getItem("token");

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!token) {
//         router.push("/login");
//         return;
//       }
//       try {
//         const response = await fetch(
//           "http://localhost:5000/doctor-service/user",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.ok) {
//           const result = await response.json();
//           console.log("Fetched user:", result.user);

//           if (result.user) {
//             setUser(result.user);
//             dispatch(setDoctorData(result.user));

//             // Check if the user is blocked
//             if (result.user.isBlocked) {
//               alert("Your account has been blocked. You will be logged out.");
//               hanldeLogout(); // Fix the function name here
//             }
//           }
//         } else {
//           console.error("Failed to fetch user data");
//           hanldeLogout(); // Fix the function name here
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         // Optionally handle errors more gracefully in UI
//       }
//     };

//     fetchUser();
//   }, [router, token]); // Removed user from dependencies

//   const hanldeLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("doctor");
//     setUser(null);
//     router.push("/login");
//   };

//   const links: any = [
//     {
//       label: (
//         <span className="text-white dark:text-neutral-200">Dashboard</span>
//       ),
//       href: "/doctor/dashboard",
//       icon: (
//         <IconBrandTabler className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: <span className="text-white dark:text-neutral-200">Profile</span>,
//       href: "/doctor/profile",
//       icon: (
//         <IconUserBolt className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: (
//         <span className="text-white dark:text-neutral-200">Appoinments</span>
//       ),
//       href: "/doctor/appoinments",
//       icon: (
//         <IconUserBolt className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: <span className="text-white dark:text-neutral-200">Chat</span>,
//       href: "/doctor/chat",
//       icon: (
//         <IconSettings className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: (
//         <span
//           className="text-white dark:text-neutral-200"
//           onClick={() => logout()}
//         >
//           Logout
//         </span>
//       ),
//       href: "/login",
//       icon: (
//         <IconArrowLeft className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//   ];
//   let logout = () => {
//     console.log("its working mahn");
//     sessionStorage.removeItem("doctor");
//     sessionStorage.removeItem("token");
//     localStorage.removeItem("doctor");
//   };
//   const [open, setOpen] = useState(false);
//   return (
//     <div
//       className={cn(
//         "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden"
//       )}
//     >
//       <Sidebar open={open} setOpen={setOpen}>
//         <SidebarBody className="justify-between gap-10 bg-[#0E0A3C]">
//           <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//             {open ? <Logo /> : <LogoIcon />}
//             <div className="mt-8 flex flex-col gap-2 ">
//               {links.map((link: any, idx: number) => (
//                 <SidebarLink key={idx} link={link} />
//               ))}
//             </div>
//           </div>
//           <div>
//             <SidebarLink
//               link={{
//                 label: "Manu Arora",
//                 href: "#",
//                 icon: (
//                   <Image
//                     src="https://assets.aceternity.com/manu.png"
//                     className="h-7 w-7 flex-shrink-0 rounded-full"
//                     width={50}
//                     height={50}
//                     alt="Avatar"
//                   />
//                 ),
//               }}
//             />
//           </div>
//         </SidebarBody>
//       </Sidebar>
//       <Dashboard />
//     </div>
//   );
// }

// export const Logo = () => {
//   return (
//     <Link
//       href="#"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
//     >
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//       <motion.span
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="font-medium text-black dark:text-white whitespace-pre"
//       >
//         Acet Labs
//       </motion.span>
//     </Link>
//   );
// };

// export const LogoIcon = () => {
//   return (
//     <Link
//       href="#"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
//     >
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//     </Link>
//   );
// };

// import MyChart from "./DynamicChart";
// // Dummy dashboard component with content
// const Dashboard = () => {
//   const notifications = Array.from({ length: 1 }, (_, index) => index);
//   return (
//     <div className="flex flex-col md:flex-row p-2 md:p-6 lg:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-full h-full">
//       <div className="flex flex-col gap-4 flex-1">
//         <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 flex-1">
//           <div
//             key="first-array"
//             className="h-[200px] lg:h-[300px] w-full lg:w-[80%] rounded-lg bg-[#0E0A3C]"
//           >
//             <h1 className="text-white font-bold relative left-4 top-4 text-[20px] ">
//               Total Appoinment
//             </h1>
//             <MyChart />
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 flex-1">
//           <div
//             key="third-array"
//             className="h-[200px] lg:h-[300px] w-full lg:w-[50%] rounded-lg bg-[#0E0A3C]"
//           >
//             <h1 className="text-white font-bold relative left-4 top-4 text-[20px] ">
//               Online Appoinments Request
//             </h1>
//           </div>

//           <div
//             key="fourth-array"
//             className="h-[200px] lg:h-[300px] w-full lg:w-[50%] rounded-lg bg-[#0E0A3C]"
//           >
//             <h1 className="text-white font-bold relative left-4 top-4 text-[20px] ">
//               Offline Appoinments Request
//             </h1>{" "}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../../../components/ui/sidebar";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/app/utils/util";
import PieChart from "../components/PieChart";
import { useRouter } from "next/navigation";
import { setDoctorData } from "@/redux/yourSlice";
import { useDispatch } from "react-redux";
import MyChart from "./DynamicChart";

export function SidebarDemo() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // Accessing localStorage in the client-side only
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      
      try {
        const response = await fetch("http://localhost:5000/doctor-service/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Fetched user:", result.user);

          if (result.user) {
            setUser(result.user);
            dispatch(setDoctorData(result.user));

            if (result.user.isBlocked) {
              alert("Your account has been blocked. You will be logged out.");
              handleLogout();
            }
          }
        } else {
          console.error("Failed to fetch user data");
          handleLogout();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token, router, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("doctor");
    setUser(null);
    router.push("/login");
  };

  const links: any = [
    {
      label: <span className="text-white dark:text-neutral-200">Dashboard</span>,
      href: "/doctor/dashboard",
      icon: <IconBrandTabler className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: <span className="text-white dark:text-neutral-200">Profile</span>,
      href: "/doctor/profile",
      icon: <IconUserBolt className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: <span className="text-white dark:text-neutral-200">Appointments</span>,
      href: "/doctor/appointments",
      icon: <IconUserBolt className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: <span className="text-white dark:text-neutral-200">Chat</span>,
      href: "/doctor/chat",
      icon: <IconSettings className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: <span className="text-white dark:text-neutral-200" onClick={handleLogout}>Logout</span>,
      href: "/login",
      icon: <IconArrowLeft className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-[#0E0A3C]">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2 ">
              {links.map((link: any, idx: number) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => (
  <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-black dark:text-white whitespace-pre">
      Acet Labs
    </motion.span>
  </Link>
);

export const LogoIcon = () => (
  <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
  </Link>
);

// Dummy dashboard component
const Dashboard = () => (
  <div className="flex flex-col md:flex-row p-2 md:p-6 lg:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-full h-full">
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 flex-1">
        <div className="h-[200px] lg:h-[300px] w-full lg:w-[80%] rounded-lg bg-[#0E0A3C]">
          <h1 className="text-white font-bold relative left-4 top-4 text-[20px] ">Total Appointments</h1>
          <MyChart/>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 flex-1">
        <div className="h-[200px] lg:h-[300px] w-full lg:w-[50%] rounded-lg bg-[#0E0A3C]">
          <h1 className="text-white font-bold relative left-4 top-4 text-[20px] ">Online Appointment Requests</h1>
        </div>

        <div className="h-[200px] lg:h-[300px] w-full lg:w-[50%] rounded-lg bg-[#0E0A3C]">
          <h1 className="text-white font-bold relative left-4 top-4 text-[20px] ">Offline Appointment Requests</h1>
        </div>
      </div>
    </div>
  </div>
);
