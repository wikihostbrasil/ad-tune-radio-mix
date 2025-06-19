
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

interface EmployeeManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmployeeManagementModal = ({ isOpen, onClose }: EmployeeManagementModalProps) => {
  const [newNames, setNewNames] = useState("");
  const [employeeNames, setEmployeeNames] = useState<string[]>([
    "João Silva",
    "Maria Santos",
    "Pedro Oliveira"
  ]);

  const handleAddNames = () => {
    if (newNames.trim()) {
      const names = newNames.split(',').map(name => name.trim()).filter(name => name);
      setEmployeeNames(prev => [...prev, ...names]);
      setNewNames("");
    }
  };

  const removeEmployee = (index: number) => {
    setEmployeeNames(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-background">
        <DialogHeader>
          <DialogTitle>Gerenciar Nomes de Funcionários</DialogTitle>
          <DialogDescription>
            Adicione nomes separados por vírgula
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Textarea
              value={newNames}
              onChange={(e) => setNewNames(e.target.value)}
              placeholder="Digite os nomes separados por vírgula (ex: João Silva, Maria Santos, Pedro Oliveira)"
              rows={3}
            />
            <Button 
              onClick={handleAddNames} 
              className="mt-2 w-full"
              disabled={!newNames.trim()}
            >
              Adicionar Nomes
            </Button>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Nomes Cadastrados:</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {employeeNames.map((name, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-accent/10 rounded border">
                  <Badge variant="outline">{name}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEmployee(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
