"use client";

import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import DashboardContent from "@/components/vetLogin/DashboardContent";
import DashboardSkeleton from "@/components/vetLogin/Loadings/DashboardLoading";

export default function Page() {
  const { isDisabled, loading } = useSubscriptionStatus();

  if (loading) {
    return <DashboardSkeleton />;
  }

  return <DashboardContent isDisabled={isDisabled} />;
}
