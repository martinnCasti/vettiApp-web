// types/calendly.d.ts
declare module "react-calendly" {
  interface CalendlyPageSettings {
    backgroundColor?: string;
    hideEventTypeDetails?: boolean;
    hideLandingPageDetails?: boolean;
    primaryColor?: string;
    textColor?: string;
  }

  interface CalendlyPrefill {
    email?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    guests?: string[];
    customAnswers?: {
      [key: string]: string;
    };
  }

  interface CalendlyUTM {
    utmCampaign?: string;
    utmContent?: string;
    utmMedium?: string;
    utmSource?: string;
    utmTerm?: string;
  }

  interface InlineWidgetProps {
    url: string;
    styles?: React.CSSProperties;
    prefill?: CalendlyPrefill;
    pageSettings?: CalendlyPageSettings;
    utm?: CalendlyUTM;
  }

  export const InlineWidget: React.FC<InlineWidgetProps>;
}
