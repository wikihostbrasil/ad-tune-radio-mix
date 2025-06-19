
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, Users } from "lucide-react";
import { EmployeeManagementModal } from "@/components/EmployeeManagementModal";

export const EmployeesTab = () => {
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [employeePlayingId, setEmployeePlayingId] = useState<string | null>(null);

  const toggleEmployeePlay = () => {
    if (employeePlayingId) {
      setEmployeePlayingId(null);
    } else {
      setEmployeePlayingId("employee-play");
      setTimeout(() => setEmployeePlayingId(null), 3000);
    }
  };

  return (
    <>
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-green-500" />
            <span>Funcionários</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Button 
              variant="outline"
              onClick={() => setShowEmployeeModal(true)}
            >
              Nomes
            </Button>
            <Button variant="outline">
              Chamadas
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div>
              <label className="text-sm font-medium mb-2 block">Frase Início</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Atenção..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="atencao">Atenção</SelectItem>
                  <SelectItem value="chamando">Chamando</SelectItem>
                  <SelectItem value="procuramos">Procuramos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Nome</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Nome da pessoa..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="joao">João Silva</SelectItem>
                  <SelectItem value="maria">Maria Santos</SelectItem>
                  <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Tipo de Chamada</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Telefone ramal..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="telefone1">Telefone ramal 1</SelectItem>
                  <SelectItem value="telefone2">Telefone ramal 2</SelectItem>
                  <SelectItem value="recepcao">Recepção</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Prioridade</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Normal..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Button 
                className="w-full"
                onClick={toggleEmployeePlay}
              >
                {employeePlayingId ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {employeePlayingId ? 'Pausar' : 'Tocar'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <EmployeeManagementModal 
        isOpen={showEmployeeModal} 
        onClose={() => setShowEmployeeModal(false)} 
      />
    </>
  );
};
