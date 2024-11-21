// components/CalendlyWidget.tsx
"use client";

import { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";

const CalendlyWidget = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {isLoading && (
        <div className="flex justify-center items-center h-[700px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      <div className={isLoading ? "hidden" : ""}>
        <InlineWidget
          url="https://calendly.com/luzzijuanma"
          styles={{
            height: "700px",
            width: "100%",
          }}
          prefill={{}}
          pageSettings={{
            backgroundColor: "ffffff",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: "00a2ff",
            textColor: "4d5055",
          }}
        />
      </div>
    </div>
  );
};

export default CalendlyWidget;
