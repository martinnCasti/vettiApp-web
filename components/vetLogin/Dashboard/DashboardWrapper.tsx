"use client";

import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import DashboardContent from "@/components/vetLogin/Dashboard/DashboardContent";
import DashboardSkeleton from "@/components/vetLogin/Loadings/DashboardLoading";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { processPaymentStatus } from "@/src/services/userServices";

interface MercadoPagoResponse {
  type: string;
  id: string;
  status: string;
  paymentId: string;
  collectorId: number;
  reason: string;
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
      const preapprovalParam = searchParams.get("preapproval");

      if (!preapprovalParam) {
        return;
      }

      setIsProcessingPayment(true);
      setPaymentError(null);

      try {
        const mercadoPagoData: MercadoPagoResponse = JSON.parse(
          decodeURIComponent(preapprovalParam)
        );
        console.log("Datos de Mercado Pago:", mercadoPagoData);

        if (!mercadoPagoData.paymentId) {
          throw new Error("No se encontró el ID de pago");
        }

        if (mercadoPagoData.status !== "authorized") {
          throw new Error("El pago no está autorizado");
        }

        const vetId = localStorage.getItem("vetId");
        if (!vetId) {
          throw new Error("No se encontró el ID del veterinario");
        }

        await processPaymentStatus({
          vetId: parseInt(vetId),
          paymentId: mercadoPagoData.paymentId,
        });

        await checkStatus();
      } catch (error) {
        console.error("Error procesando el pago:", error);
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
