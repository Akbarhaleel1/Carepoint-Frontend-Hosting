// import MapComponent from "@/app/MapContainer/MapContainers";
// import { Suspense } from "react";

// const page = () => {
//   return (
//     <div>
//       <Suspense fallback={<div>Loading...</div>}>
//         <MapComponent />
//       </Suspense>
//     </div>
//   );
// };

// export default page;


// page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";

const MapComponent = dynamic(() => import("@/app/MapContainer/MapContainers"), {
  ssr: false,
});

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MapComponent />
      </Suspense>
    </div>
  );
};

export default Page;
