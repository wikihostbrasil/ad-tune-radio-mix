
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface SuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuggestionsModal = ({ isOpen, onClose }: SuggestionsModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    suggestion: "",
  });

  const handleSubmit = () => {
    console.log("Sugestão enviada:", formData);
    setFormData({ name: "", type: "", suggestion: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-background">
        <DialogHeader>
          <DialogTitle>Sugestões</DialogTitle>
          <DialogDescription>
            Envie suas sugestões para melhorarmos nosso sistema
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Seu nome (opcional)</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Digite seu nome"
            />
          </div>

          <div>
            <Label htmlFor="type">Sugestão</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anuncio">Anúncio</SelectItem>
                <SelectItem value="aprimoramento">Aprimoramento</SelectItem>
                <SelectItem value="funcionalidade">Funcionalidade</SelectItem>
                <SelectItem value="playlist">Playlist</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="suggestion">Detalhes</Label>
            <Textarea
              id="suggestion"
              value={formData.suggestion}
              onChange={(e) => setFormData(prev => ({ ...prev, suggestion: e.target.value }))}
              placeholder="Descreva sua sugestão..."
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Enviar Sugestão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
