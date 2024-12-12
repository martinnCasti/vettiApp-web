import { memo } from "react";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";

const DisabledBanner = memo(() => {
  const { isStatusDisabled, loading } = useSubscriptionStatus();

  // Solo mostrar si está disabled el status
  if (loading || !isStatusDisabled) {
    return null;
  }

  return (
    <div className="px-6 py-4 bg-gray-100">
      <div className="bg-yellow-100 py-2 px-4 rounded-lg border border-yellow-400">
        <p className="text-center text-gray-800">
          Tu cuenta está pendiente de activación. Esto podría tardar unas 24hs
          aproximadamente. Una vez activada la cuenta se le enviara un mail con
          la confirmacion de la activación
        </p>
      </div>
    </div>
  );
});

DisabledBanner.displayName = "DisabledBanner";

export default DisabledBanner;
