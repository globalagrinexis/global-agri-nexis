// src/components/services/services.data.js

import {
  TrendingUp,
  Handshake,
  Scale,
  FileCheck,
  IndianRupee,
  Globe,
} from "lucide-react";

export const services = [
  {
    title: "Tech-Driven Market Research",
    description:
      "Actionable commodity insights powered by advanced technical analysis and in-depth fundamental research from Asia’s leading research partners.",
    icon: <TrendingUp className="h-6 w-6 text-emerald-600" />,
    className: "md:col-span-2",
  },
  {
    title: "Trusted Trading Expertise",
    description:
      "Skilled traders who stay ahead of market movements while building strong, long-term partnerships with buyers and sellers.",
    icon: <Handshake className="h-6 w-6 text-emerald-600" />,
  },
  {
    title: "Legal Precision in Trade",
    description:
      "In-depth expertise in global contractual structures and GAFTA-compliant commodity regulations, supporting risk-mitigated transactions.",
    icon: <Scale className="h-6 w-6 text-emerald-600" />,
  },
  {
    title: "Contract Execution & Operations",
    description:
      "Experienced professionals managing L/Cs, documentation, payments, and lifting with precision.",
    icon: <FileCheck className="h-6 w-6 text-emerald-600" />,
  },
  {
    title: "Origin-to-India Pricing Expertise",
    description:
      "FOB-to-C&F India price analysis, duty monitoring, and regulatory insights that protect buyers from overpricing.",
    icon: <IndianRupee className="h-6 w-6 text-emerald-600" />,
  },
  {
    title: "Strategic Global Sourcing",
    description:
      "Continuous evaluation of global market signals to identify timely opportunities and reliable sourcing partners.",
    icon: <Globe className="h-6 w-6 text-emerald-600" />,
    className: "md:col-span-2",
  },
];
