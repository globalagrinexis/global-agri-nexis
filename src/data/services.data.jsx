// src/components/services/services.data.js

import {
  BrainCircuit,
  Route,
  ShieldCheck,
  Workflow,
  ShieldAlert,
  Network,
} from "lucide-react";

export const services = [
  {
    title: "Integrated Agricultural Brokerage Solutions",
    description: (
      <>
        Global Agri Nexis delivers end-to-end agricultural brokerage and advisory services, enabling seamless execution across global commodity markets. We combine market intelligence, operational discipline, and trusted counterpart access to create efficient, value-driven trade outcomes.
        <br /> <br />
        Our brokerage platform supports a diversified range of commodities including grains, pulses, oilseeds, and allied agricultural products, connecting clients with verified domestic and international partners.
      </>
    ),
    icon: <Network className="h-6 w-6 text-emerald-600" />,
    className: "md:col-span-2",
  },
  {
    title: "Logistics & Supply Chain Management",
    description: (
      <>
        We deliver end-to-end logistics coordination across global supply chains, covering transportation planning, freight forwarding, container bookings, warehousing, port operations, documentation, and real-time shipment monitoring—ensuring efficiency, visibility, and execution certainty.
      </>
    ),
    icon: <Route className="h-6 w-6 text-emerald-600" />,
  },
  {
    title: "Contractual & Regulatory Excellence",
    description: (
      <>
        Comprehensive command of international trade structures and GAFTA-aligned regulations, enabling secure, compliant, and risk-mitigated transactions.
      </>
    ),
    icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />,
  },
  {
    title: "Trade Execution & Operations",
    description: (
      <>
        From contract structuring to final settlement, we manage the full trade lifecycle—ensuring compliance, transparency, and execution certainty across international transactions.
      </>
    ),
    icon: <Workflow className="h-6 w-6 text-emerald-600" />,
  },
  {
    title: "Risk Management Solutions",
    description: (
      <>
        We support disciplined risk management across agricultural trade by addressing price volatility, contractual exposure, counterparty risk, payment security, insurance coverage, and dispute resolution—protecting capital and ensuring execution certainty.
      </>
    ),
    icon: <ShieldAlert className="h-6 w-6 text-emerald-600" />,
  },
  {
    title: "Tech Based Market Intelligence & Strategic Advisory",
    description: (
      <>
       We provide real-time Technology driven market insights and strategic guidance through to help clients navigate volatility and capitalize on opportunity. Our advisory covers price trends, crop cycles, policy developments, and supply–demand dynamics, enabling informed, data-led trading decisions.
      </>
    ),
    icon: <BrainCircuit className="h-6 w-6 text-emerald-600" />,
    className: "md:col-span-2",
  },
];
