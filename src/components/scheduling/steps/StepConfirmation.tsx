import React from "react";
import { useScheduling } from "@/contexts/SchedulingContext";
import { Button } from "@/components/ui/Button";
import { createAppointment } from "@/app/actions/scheduling";

export function StepConfirmation() {
  const { state, prevStep, closeModal, resetState } = useScheduling();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleConfirm = async () => {
    if (!state.userInfo || !state.barber || !state.service || !state.date || !state.time) return;
    
    const formattedDate = state.date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    const message = `📅 NOVO AGENDAMENTO

👤 Cliente:
${state.userInfo.name}

💈 Barbeiro:
${state.barber.name}

✂️ Serviço:
${state.service.title}

📆 Data:
${formattedDate}

🕒 Horário:
${state.time}

📱 Telefone:
${state.userInfo.phone}

Aguardo confirmação.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "558184049137";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    setIsSubmitting(true);
    try {
      await createAppointment({
        customerName: state.userInfo.name,
        customerPhone: state.userInfo.phone,
        barberId: state.barber.id,
        serviceTitle: state.service.title,
        servicePrice: state.service.price,
        serviceDuration: state.service.duration,
        date: state.date.toISOString().split('T')[0],
        time: state.time
      });
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, "_blank");
      
      // Close modal and reset
      resetState();
    } catch (error) {
      console.error("Failed to save appointment", error);
      alert("Houve um erro ao salvar o agendamento. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button onClick={prevStep} className="text-white/50 hover:text-white mr-4 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h3 className="text-xl font-serif text-white m-0">Confirmação</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
        
        <div className="bg-background-deep border border-border/20 rounded-xl p-5 space-y-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted font-medium uppercase tracking-wider mb-1">Cliente</span>
            <span className="text-white font-semibold">{state.userInfo?.name}</span>
            <span className="text-white/70 text-sm mt-0.5">{state.userInfo?.phone}</span>
          </div>

          <div className="h-[1px] w-full bg-border/10" />

          <div className="flex flex-col">
            <span className="text-xs text-muted font-medium uppercase tracking-wider mb-1">Detalhes do Agendamento</span>
            <div className="grid grid-cols-2 gap-y-3 mt-2">
              <div>
                <span className="text-xs text-white/50 block">Barbeiro</span>
                <span className="text-white font-medium text-sm">{state.barber?.name}</span>
              </div>
              <div>
                <span className="text-xs text-white/50 block">Serviço</span>
                <span className="text-white font-medium text-sm">{state.service?.title}</span>
              </div>
              <div>
                <span className="text-xs text-white/50 block">Data</span>
                <span className="text-white font-medium text-sm">
                  {state.date?.toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </span>
              </div>
              <div>
                <span className="text-xs text-white/50 block">Horário</span>
                <span className="text-white font-medium text-sm">{state.time}</span>
              </div>
            </div>
          </div>
          
          <div className="h-[1px] w-full bg-border/10" />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted">Valor Estimado</span>
            <span className="text-gold-soft font-semibold text-lg">{state.service?.price}</span>
          </div>

        </div>

      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button 
          variant="secondary"
          onClick={closeModal} 
          className="w-full sm:w-1/3 order-2 sm:order-1"
        >
          CANCELAR
        </Button>
        <Button 
          onClick={handleConfirm} 
          disabled={isSubmitting}
          className="w-full sm:w-2/3 order-1 sm:order-2"
        >
          {isSubmitting ? "SALVANDO..." : "CONFIRMAR AGENDAMENTO"}
        </Button>
      </div>
    </div>
  );
}
