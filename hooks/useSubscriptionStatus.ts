// hooks/useSubscriptionStatus.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import api from "@/src/api";

interface SubscriptionStatus {
  isStatusDisabled: boolean;
  isPaymentPending: boolean;
  loading: boolean;
}

export const useSubscriptionStatus = () => {
  const [status, setStatus] = useState<SubscriptionStatus>({
    isStatusDisabled: true,
    isPaymentPending: true,
    loading: true,
  });

  const pathname = usePathname();
  const lastCheckedRef = useRef<number>(0);
  const checkingRef = useRef(false);
  const statusRef = useRef(status);

  // Actualizar la referencia cuando cambia el estado
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const verifySubscription = useCallback(async (force = false) => {
    if (checkingRef.current) return;

    const now = Date.now();
    if (!force && now - lastCheckedRef.current < 5000) {
      return;
    }

    try {
      checkingRef.current = true;
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) return;

      const response = await api.get(`/vet/searchVetByEmail/${userEmail}`);

      // Solo actualizar si el estado ha cambiado
      const newStatus = {
        isStatusDisabled: response.data.status !== "enabled",
        isPaymentPending: response.data.payment !== "pay",
        loading: false,
      };

      if (JSON.stringify(newStatus) !== JSON.stringify(statusRef.current)) {
        setStatus(newStatus);
      }

      lastCheckedRef.current = now;
    } catch (error) {
      console.error("Error en verificación:", error);
    } finally {
      checkingRef.current = false;
    }
  }, []);

  // Solo verificar cuando cambia la ruta
  useEffect(() => {
    if (pathname?.startsWith("/login")) {
      verifySubscription(true);
    }
  }, [pathname, verifySubscription]);

  return {
    ...status,
    checkStatus: useCallback(
      () => verifySubscription(true),
      [verifySubscription]
    ),
  };
};
