import { Suspense } from "react";
import ResetPasswordClient from "@/components/vetLogin/Auth/ResetPassword";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            Cargando...
          </div>
        </div>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
