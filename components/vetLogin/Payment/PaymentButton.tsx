"use client";
import React, { useEffect } from "react";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";

declare global {
  interface Window {
    $MPC_loaded?: boolean;
    attachEvent?: (event: string, callback: () => void) => void;
  }
}

interface PaymentButtonProps {
  className?: string;
  children: React.ReactNode;
  planId: string;
}

const PaymentButton = ({
  className = "",
  children,
  planId,
}: PaymentButtonProps) => {
  const { checkStatus } = useSubscriptionStatus();

  useEffect(() => {
    function $MPC_load() {
      if (!window.$MPC_loaded) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = `${document.location.protocol}//secure.mlstatic.com/mptools/render.js`;
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript?.parentNode?.insertBefore(script, firstScript);
        window.$MPC_loaded = true;
      }
    }

    if (!window.$MPC_loaded) {
      if (window.attachEvent) {
        window.attachEvent("onload", $MPC_load);
      } else {
        window.addEventListener("load", $MPC_load, false);
      }
    }

    function handleSubscriptionMessage(event: MessageEvent) {
      console.log("Subscription event:", event.data);
      checkStatus();
    }

    window.addEventListener("message", handleSubscriptionMessage);

    return () => {
      window.removeEventListener("message", handleSubscriptionMessage);
    };
  }, [checkStatus]);

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("vetId") : null;

  return (
    <a
      href={`https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=${planId}&external_reference=${userId}`}
      className={className}
      data-mp-button="true"
    >
      {children}
    </a>
  );
};

export default PaymentButton;
