
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Play, Pause } from "lucide-react";

interface VehicleManagerProps {
  onPlayToggle?: () => void;
  isPlaying?: boolean;
}

export const VehicleManager = ({ onPlayToggle, isPlaying = false }: VehicleManagerProps) => {
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");

  const vehicleModels = [
    "Corolla", "Civic", "Gol", "Onix", "HB20", "Ka", "Palio", "Uno", "Fiesta", "Focus"
  ];

  const vehicleColors = [
    "Branco", "Preto", "Prata", "Azul", "Vermelho", "Cinza", "Verde", "Amarelo", "Bege", "Marrom"
  ];

  const handlePlateChange = (value: string) => {
    // Allow only letters and numbers, max 7 characters
    const filtered = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
    setVehiclePlate(filtered);
  };

  const handlePlay = () => {
    if (vehicleModel && vehicleColor && vehiclePlate.length === 7) {
      console.log("Playing vehicle announcement:", { vehicleModel, vehicleColor, vehiclePlate });
      if (onPlayToggle) {
        onPlayToggle();
      }
    }
  };

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Car className="w-5 h-5 text-blue-500" />
          <span>Veículos</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-sm font-medium mb-2 block">Modelo</label>
            <Select value={vehicleModel} onValueChange={setVehicleModel}>
              <SelectTrigger>
                <SelectValue placeholder="Buscar modelo..." />
              </SelectTrigger>
              <SelectContent>
                {vehicleModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Cor</label>
            <Select value={vehicleColor} onValueChange={setVehicleColor}>
              <SelectTrigger>
                <SelectValue placeholder="Buscar cor..." />
              </SelectTrigger>
              <SelectContent>
                {vehicleColors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Placa</label>
            <Input
              value={vehiclePlate}
              onChange={(e) => handlePlateChange(e.target.value)}
              placeholder="ABC1234"
              maxLength={7}
              className="uppercase"
            />
          </div>
          
          <div>
            <Button 
              className="w-full" 
              onClick={handlePlay}
              disabled={!vehicleModel || !vehicleColor || vehiclePlate.length !== 7}
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? 'Pausar' : 'Tocar'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
