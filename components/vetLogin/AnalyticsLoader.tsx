// components/AnalyticsLoader.tsx
"use client";

import { useEffect } from "react";

const AnalyticsLoader = () => {
  useEffect(() => {
    // Función para cargar scripts de manera segura
    const loadScript = (src: string, id: string) => {
      if (document.getElementById(id)) return;

      const script = document.createElement("script");
      script.src = src;
      script.id = id;
      script.async = true;
      script.defer = true;

      // Manejar errores de carga silenciosamente
      script.onerror = () => {
        console.log(`Script ${id} no pudo cargarse, continuando sin él`);
      };

      document.body.appendChild(script);
    };

    // Intentar cargar los scripts necesarios
    try {
      // Segment.io (si es necesario)
      loadScript(
        "https://cdn.segment.io/analytics.js/v1/rfvnxd6wnn/analytics.min.js",
        "segment-script"
      );

      // Facebook Pixel (si es necesario)
      loadScript(
        "https://connect.facebook.net/en_US/fbevents.js",
        "facebook-pixel"
      );
    } catch (error) {
      // Continuar sin analytics si hay errores
      console.log("Analytics no disponibles");
    }

    return () => {
      // Limpiar scripts al desmontar
      ["segment-script", "facebook-pixel"].forEach((id) => {
        const script = document.getElementById(id);
        if (script) {
          script.remove();
        }
      });
    };
  }, []);

  return null;
};

export default AnalyticsLoader;
