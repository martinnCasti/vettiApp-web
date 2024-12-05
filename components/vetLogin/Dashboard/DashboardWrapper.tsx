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
      const allParams: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        allParams[key] = value;
        console.log("Parámetro:", key, "Valor:", value);
      });

      console.log("Todos los parámetros:", allParams);

      const preapprovalId = searchParams.get("preapproval_id");
      console.log("Preapproval ID recibido:", preapprovalId);

      if (preapprovalId) {
        setIsProcessingPayment(true);
        try {
          const vetId = localStorage.getItem("vetId");

          if (!vetId) {
            throw new Error("No se encontró el ID del veterinario");
          }
          await processPaymentStatus({
            vetId: parseInt(vetId),
            paymentId: preapprovalId,
          });

          await checkStatus();
          console.log("Suscripción procesada con éxito");
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
        Error al procesar la suscripción: {paymentError}
      </div>
    );
  }

  return <DashboardContent isDisabled={isDisabled} isPaymentPending={false} />;
}
