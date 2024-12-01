import PaymentButton from "./PaymentButton";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";

const PaymentBanner = () => {
  const { isPaymentPending, loading } = useSubscriptionStatus();

  // Solo mostrar si el pago está pendiente
  if (loading || !isPaymentPending) return null;

  return (
    <div className="px-6 py-4 bg-gray-100">
      <div className="bg-red-100 py-2 px-4 rounded-lg border border-red-400">
        <p className="text-center text-gray-800">
          Tu cuenta está pendiente de suscripción.{" "}
          <PaymentButton
            planId="2c938084934d1f1701937f49f59411e1"
            className="font-semibold text-gray-800 underline"
          >
            Suscribite haciendo clic acá
          </PaymentButton>
        </p>
      </div>
    </div>
  );
};

export default PaymentBanner;
