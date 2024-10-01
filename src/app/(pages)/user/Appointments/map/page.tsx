import MapComponent from "@/app/MapContainer/MapContainers";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MapComponent />
      </Suspense>
    </div>
  );
};

export default page;
