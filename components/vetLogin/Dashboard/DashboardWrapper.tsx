"use client";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import DashboardContent from "@/components/vetLogin//Dashboard/DashboardContent";
import DashboardSkeleton from "@/components/vetLogin/Loadings/DashboardLoading";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { processPaymentStatus } from "@/src/services/userServices";

interface PreapprovalData {
  paymentId: string;
  status: string;
}

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
      const preapprovalParam = searchParams.get("preapproval");

      if (!preapprovalParam) {
        return;
      }

      setIsProcessingPayment(true);
      setPaymentError(null);

      try {
        const preapprovalData = JSON.parse(
          decodeURIComponent(preapprovalParam)
        );
        const paymentId = preapprovalData.paymentId;
        const status = preapprovalData.status;

        console.log("Payment ID:", paymentId);
        console.log("Status:", status);

        if (!paymentId || status !== "authorized") {
          throw new Error("Pago no autorizado o ID de pago no encontrado");
        }

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

  return <DashboardContent isDisabled={isDisabled} isPaymentPending={false} />;
}
