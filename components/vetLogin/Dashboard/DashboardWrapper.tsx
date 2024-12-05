"use client";

import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import DashboardContent from "@/components/vetLogin/Dashboard/DashboardContent";
import DashboardSkeleton from "@/components/vetLogin/Loadings/DashboardLoading";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  processPaymentStatus,
  PaymentProcessRequest,
} from "@/src/services/userServices";

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
      const preapprovalId = searchParams.get("preapproval_id");
      console.log("Preapproval ID recibido:", preapprovalId);

      if (preapprovalId) {
        setIsProcessingPayment(true);
        try {
          const vetId = localStorage.getItem("vetId");

          if (!vetId) {
            throw new Error("No se encontró el ID del veterinario");
          }

          const paymentData: PaymentProcessRequest = {
            vetId: parseInt(vetId),
            preApprovalId: preapprovalId, // Usando el nombre correcto según la interfaz
          };

          console.log("Datos a enviar al backend:", paymentData);

          await processPaymentStatus(paymentData);
          await checkStatus();
          console.log("Suscripción procesada con éxito");
        } catch (error: any) {
          console.error("Error detallado:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
          });

          setPaymentError(
            error.response?.data?.message ||
              error.message ||
              "Error desconocido al procesar la suscripción"
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
        <h3 className="font-bold mb-2">Error al procesar la suscripción:</h3>
        <p>{paymentError}</p>
      </div>
    );
  }

  return <DashboardContent isDisabled={isDisabled} isPaymentPending={false} />;
}
