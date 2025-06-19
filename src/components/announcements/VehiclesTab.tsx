
import { useState } from "react";
import { VehicleManager } from "@/components/VehicleManager";

export const VehiclesTab = () => {
  const [vehiclePlayingId, setVehiclePlayingId] = useState<string | null>(null);

  const toggleVehiclePlay = () => {
    if (vehiclePlayingId) {
      setVehiclePlayingId(null);
    } else {
      setVehiclePlayingId("vehicle-play");
      setTimeout(() => setVehiclePlayingId(null), 3000);
    }
  };

  return (
    <VehicleManager onPlayToggle={toggleVehiclePlay} isPlaying={!!vehiclePlayingId} />
  );
};
