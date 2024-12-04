"use client";

import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import DashboardContent from "@/components/vetLogin/Dashboard/DashboardContent";
import DashboardSkeleton from "@/components/vetLogin/Loadings/DashboardLoading";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { processPaymentStatus } from "@/src/services/userServices";

export default function Page() {
  const {
    isStatusDisabled: isDisabled,
    loading,
    checkStatus,
  } = useSubscriptionStatus();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const handlePaymentProcess = async () => {
      // Crear un objeto Record para almacenar los parámetros
      const allParams: Record<string, string> = {};

      // Iterar sobre los parámetros de manera segura
      searchParams.forEach((value, key) => {
        allParams[key] = value;
        console.log("Parámetro:", key, "Valor:", value);
      });

      console.log("Todos los parámetros:", allParams);

      // Obtener tanto preapproval_id como payment_id
      const preapprovalId = searchParams.get("preapproval_id");
      const paymentId = searchParams.get("payment_id");
      console.log("Preapproval ID recibido:", preapprovalId);
      console.log("Payment ID recibido:", paymentId);

      // Procesar si hay cualquiera de los dos IDs
      if (preapprovalId || paymentId) {
        setIsProcessingPayment(true);
        try {
          const vetId = localStorage.getItem("vetId");

          if (!vetId) {
            throw new Error("No se encontró el ID del veterinario");
          }

          // Procesar el pago usando el ID correspondiente
          const idToProcess = paymentId || preapprovalId;
          if (!idToProcess) {
            throw new Error("No se encontró ID de pago válido");
          }

          await processPaymentStatus({
            vetId: parseInt(vetId),
            paymentId: idToProcess,
          });

          await checkStatus();
          console.log("Pago procesado con éxito");
        } catch (error) {
          console.error("Error:", error);
          setPaymentError(
            error instanceof Error ? error.message : "Error desconocido"
          );
        } finally {
          setIsProcessingPayment(false);
        }
      }
    };

    handlePaymentProcess();
  }, [searchParams, checkStatus]);

  if (loading || isProcessingPayment) {
    return <DashboardSkeleton />;
  }

  if (paymentError) {
    return (
      <div className="p-4 text-red-600">
        Error al procesar el pago: {paymentError}
      </div>
    );
  }

  return <DashboardContent isDisabled={isDisabled} isPaymentPending={false} />;
}
