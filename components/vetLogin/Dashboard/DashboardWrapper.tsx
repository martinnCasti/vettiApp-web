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
    const processMercadoPagoPayment = async () => {
      const paymentId = searchParams.get("payment_id");
      const status = searchParams.get("status");

      console.log("Payment ID:", paymentId);
      console.log("Status:", status);

      if (!paymentId || status !== "approved") {
        console.log("No hay payment_id o el status no es approved");
        return;
      }

      setIsProcessingPayment(true);
      setPaymentError(null);

      try {
        const vetId = localStorage.getItem("vetId");
        if (!vetId) {
          throw new Error("No se encontró el ID del veterinario");
        }

        await processPaymentStatus({
          vetId: parseInt(vetId),
          paymentId,
        });

        await checkStatus();
        console.log("Pago procesado exitosamente");
      } catch (error) {
        console.error("Error:", error);
        setPaymentError(
          error instanceof Error ? error.message : "Error desconocido"
        );
      } finally {
        setIsProcessingPayment(false);
      }
    };

    processMercadoPagoPayment();
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
