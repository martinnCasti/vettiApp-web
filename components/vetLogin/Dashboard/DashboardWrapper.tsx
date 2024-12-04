"use client";

import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import DashboardContent from "@/components/vetLogin/Dashboard/DashboardContent";
import DashboardSkeleton from "@/components/vetLogin/Loadings/DashboardLoading";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { processPaymentStatus } from "@/src/services/userServices";

interface PreapprovalData {
  type: string;
  id: string;
  status: string;
  paymentId: string;
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
    const processMercadoPagoPayment = async () => {
      console.log("Procesando pago de Mercado Pago...");

      const preapproval = searchParams.get("preapproval");
      if (!preapproval) {
        console.log("No hay datos de preapproval");
        return;
      }

      try {
        const preapprovalData: PreapprovalData = JSON.parse(
          decodeURIComponent(preapproval)
        );
        console.log("Datos de preapproval:", preapprovalData);

        if (!preapprovalData.paymentId) {
          console.log("No se encontró paymentId en los datos");
          return;
        }

        setIsProcessingPayment(true);
        setPaymentError(null);

        const vetId = localStorage.getItem("vetId");
        if (!vetId) {
          throw new Error("No se encontró el ID del veterinario");
        }

        await processPaymentStatus({
          vetId: parseInt(vetId),
          paymentId: preapprovalData.paymentId,
        });

        await checkStatus();
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
