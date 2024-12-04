"use client";

import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import DashboardContent from "@/components/vetLogin/DashboardContent";
import DashboardSkeleton from "@/components/vetLogin/Loadings/DashboardLoading";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { processPaymentStatus } from "@/src/services/userServices";

export default function Page() {
  const { isStatusDisabled, isPaymentPending, loading, checkStatus } =
    useSubscriptionStatus();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const handlePaymentProcess = async () => {
      const collectionId = searchParams.get("collection_id");
      const collectionStatus = searchParams.get("collection_status");
      const paymentId = searchParams.get("payment_id");

      if (!paymentId || collectionStatus !== "approved") return;

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
      } catch (error) {
        console.error("Error al procesar el pago:", error);
        setPaymentError(
          error instanceof Error ? error.message : "Error desconocido"
        );
      } finally {
        setIsProcessingPayment(false);
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

  return (
    <DashboardContent
      isDisabled={isStatusDisabled}
      isPaymentPending={isPaymentPending}
    />
  );
}
