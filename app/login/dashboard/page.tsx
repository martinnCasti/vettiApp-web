import { Suspense } from "react";
import DashboardSkeleton from "@/components/vetLogin/Loadings/DashboardLoading";
import DashboardWrapper from "@/components/vetLogin/Dashboard/DashboardWrapper";

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardWrapper />
    </Suspense>
  );
}
