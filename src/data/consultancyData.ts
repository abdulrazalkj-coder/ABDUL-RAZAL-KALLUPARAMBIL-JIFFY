import stirlingImg from '../assets/images/case_trades_solar_1794824165635.jpg';
import paradeImg from '../assets/images/case_hospitality_barossa_1794824166324.jpg';
import coastalImg from '../assets/images/hero_adelaide_studio_1794824164721.jpg';
export type IndustryFilter =
  | 'all'
  | 'trades'
  | 'health'
  | 'hospitality';

export interface Capability {
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  outcomeMetric: string;
  span: 'wide' | 'standard';
}

export interface CaseStudy {
  id: string;
  category: Exclude<IndustryFilter, 'all'>;
  categoryLabel: string;
  suburb: string;
  client: string;
  headlineMetric: string;
  secondaryMetric: string;
  challenge: string;
  execution: string;
  imageSrc?: string;
  imageAlt: string;
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export interface SuburbSearchPreview {
  suburb: string;
  searchTerm: string;
  mapRank: string;
  monthlyCalls: number;
  costPerLead: string;
}

export interface TradePreset {
  id: string;
  label: string;
  defaultJobValue: number;
  closeRate: number;
  avgCpl: number;
}

export const HERO_PROOF_METRICS = [
  {
    value: '38+',
    label: 'Active SA Businesses',
    context: 'Trades, clinics & hospitality across Greater Adelaide',
  },
  {
    value: '$4.8M',
    label: 'Tracked Client Pipeline',
    context: 'Attributed via call tracking & quote forms in 12 months',
  },
  {
    value: '4.2x',
    label: 'Median Ad Spend Return',
    context: 'Measured against net invoiced jobs, not vanity clicks',
  },
  {
    value: '14 Days',
    label: 'Launch to Live Enquiries',
    context: 'Full campaign, landing funnel & tracking deployment',
  },
];

export const SUBURB_SEARCH_PREVIEWS: SuburbSearchPreview[] = [
  {
    suburb: 'Adelaide Hills & Mount Barker',
    searchTerm: 'solar battery installation mount barker',
    mapRank: '#1 Map Pack',
    monthlyCalls: 46,
    costPerLead: '$34 AUD',
  },
  {
    suburb: 'Norwood & Eastern Suburbs',
    searchTerm: 'emergency blocked drain plumber norwood',
    mapRank: '#1 Map Pack',
    monthlyCalls: 62,
    costPerLead: '$28 AUD',
  },
  {
    suburb: 'Glenelg & Holdfast Bay',
    searchTerm: 'bathroom renovation builder glenelg',
    mapRank: '#2 Map Pack',
    monthlyCalls: 29,
    costPerLead: '$52 AUD',
  },
  {
    suburb: 'Barossa Valley & Gawler',
    searchTerm: 'commercial air conditioning service barossa',
    mapRank: '#1 Map Pack',
    monthlyCalls: 34,
    costPerLead: '$31 AUD',
  },
];

export const CAPABILITIES: Capability[] = [
  {
    number: '01.',
    title: 'Google Maps & Local Search Dominance',
    summary:
      'When a homeowner in Burnside or a site manager in Port Adelaide searches for a licensed trade, your business needs to sit in the top three Map Pack results. We build suburb-specific authority pages, clean up local citations, and structure your Google Business Profile to capture ready-to-book calls.',
    deliverables: [
      'Google Business Profile category & service-area architecture',
      'Suburb-targeted service pages across Metro Adelaide & regional SA',
      'Automated post-job SMS review requests that compound 5-star trust',
    ],
    outcomeMetric: 'Top-3 Map Pack visibility within 60–90 days',
    span: 'wide',
  },
  {
    number: '02.',
    title: 'Conversion-First Trade & Clinic Websites',
    summary:
      'Slow brochure sites leak enquiries. We engineer fast, mobile-first websites structured around clear suburb proof, upfront licensing credentials, and two-step quote funnels built for people checking their phones between jobs.',
    deliverables: [
      'Sub-second mobile load speed & click-to-call bar',
      'Direct integration with ServiceM8, Tradify & Cliniko',
      'Authentic job-site photography & SA licence trust signals',
    ],
    outcomeMetric: '6.8%–11.4% visitor-to-quote conversion rate',
    span: 'standard',
  },
  {
    number: '03.',
    title: 'High-Intent Google Ads & Meta Lead Systems',
    summary:
      'No broad-match budget bleed on DIY searches or interstate clicks. Every dollar targets South Australian postcodes and high-margin service keywords, tracked right down to recorded phone enquiries.',
    deliverables: [
      'Negative-keyword lists tailored for Australian trade slang',
      'Postcode exclusion & time-of-day dispatch bidding',
      'Dynamic call tracking tied directly to invoiced revenue',
    ],
    outcomeMetric: '4.2x median return on ad spend across SA accounts',
    span: 'standard',
  },
  {
    number: '04.',
    title: 'Automated Quote Follow-Up & Missed-Call Recovery',
    summary:
      'Tradies lose up to 40% of inbound work simply because they are on the tools or up a ladder when the phone rings. We install instant missed-call SMS replies and 7-day quote nudges so warm local leads never call your competitor next.',
    deliverables: [
      'Instant missed-call SMS response under 15 seconds',
      'Automated 3-touch quote follow-up sequences',
      'CRM pipeline reporting synced with Xero & job management',
    ],
    outcomeMetric: '32% recovery of previously missed phone enquiries',
    span: 'wide',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'hills-solar',
    category: 'trades',
    categoryLabel: 'Trades & Construction',
    suburb: 'Mount Barker & Adelaide Hills',
    client: 'Stirling Hills Solar & Electrical',
    headlineMetric: '+164% Qualified Quote Requests in 90 Days',
    secondaryMetric: '$1.42M Tracked Residential Solar Pipeline',
    challenge:
      'Relied heavily on word-of-mouth and expensive national aggregator leads that were shared with four competing electricians.',
    execution:
      'Replaced aggregator spend with dedicated Adelaide Hills battery-rebate landing pages, exact-match Google Search campaigns, and ServiceM8 missed-call SMS recovery.',
    imageSrc: stirlingImg,
    imageAlt: 'South Australian solar electrician reviewing plans on a rugged tablet beside a work ute in the Adelaide Hills',
    quote: {
      text: 'Before working with Elevate Digital SA, we were paying for shared leads that turned into price-shopping headaches. Within 90 days our phone rang with exclusive Hills homeowners ready to book site inspections, adding two full-time sparkies to the crew.',
      author: 'Lachlan Bennett',
      role: 'Director, Stirling Hills Solar & Electrical',
    },
  },
  {
    id: 'norwood-merchant',
    category: 'hospitality',
    categoryLabel: 'Retail & Hospitality',
    suburb: 'Norwood & East Adelaide',
    client: 'The Parade Provisions & Roastery',
    headlineMetric: '+88% Weekday Catering & Wholesale Orders',
    secondaryMetric: '310+ New 5-Star Google Reviews in 6 Months',
    challenge:
      'Strong weekend foot traffic on The Parade, but quiet Tuesday-to-Thursday corporate catering bookings and low visibility for local gift hampers.',
    execution:
      'Built a dedicated Adelaide CBD and Eastern Suburbs corporate catering funnel, optimised Google Maps for local office searches, and deployed QR review cards at the counter.',
    imageSrc: paradeImg,
    imageAlt: 'Bustling contemporary cafe and specialty provisions counter in Norwood Adelaide during morning service',
    quote: {
      text: 'They understood Norwood and Adelaide corporate buyers immediately. Our mid-week catering calendar went from unpredictable to booked two weeks ahead, and our Google rating jumped from 4.3 to 4.9 stars.',
      author: 'Claire Henderson',
      role: 'Co-Owner, The Parade Provisions & Roastery',
    },
  },
  {
    id: 'henley-dental',
    category: 'health',
    categoryLabel: 'Health & Clinics',
    suburb: 'Henley Beach & Western Suburbs',
    client: 'Coastal Care Dental & Implant Studio',
    headlineMetric: '+47 New High-Value Patient Bookings Monthly',
    secondaryMetric: '$41 Average Cost Per Booked Consultation',
    challenge:
      'General dental searches were saturated by corporate chains, leaving high-margin implant and Invisalign chairs underutilised.',
    execution:
      'Restructured the website around calm practitioner authority pages, suburb-focused search campaigns across Henley, Grange, and West Lakes, and online Cliniko booking integration.',
    imageSrc: coastalImg,
    imageAlt: 'Strategic digital marketing planning session in Adelaide studio overlooking eucalyptus parklands',
    quote: {
      text: 'Every metric Elevate Digital SA reports is tied to real patients sitting in the chair. Our cost per consultation dropped by 38% while our implant case acceptance climbed steadily.',
      author: 'Dr. Nathan Kowalski',
      role: 'Principal Dentist, Coastal Care Dental',
    },
  },
];

export const TRADE_PRESETS: TradePreset[] = [
  {
    id: 'electrical-solar',
    label: 'Electrical & Solar',
    defaultJobValue: 6800,
    closeRate: 0.32,
    avgCpl: 48,
  },
  {
    id: 'plumbing-hvac',
    label: 'Plumbing & HVAC',
    defaultJobValue: 1450,
    closeRate: 0.45,
    avgCpl: 34,
  },
  {
    id: 'building-landscaping',
    label: 'Building & Landscaping',
    defaultJobValue: 12500,
    closeRate: 0.24,
    avgCpl: 68,
  },
  {
    id: 'clinics-dental',
    label: 'Health & Dental Clinics',
    defaultJobValue: 2200,
    closeRate: 0.42,
    avgCpl: 44,
  },
  {
    id: 'hospitality-retail',
    label: 'Local Retail & Catering',
    defaultJobValue: 950,
    closeRate: 0.5,
    avgCpl: 26,
  },
];

export const SA_REGIONS = [
  'Adelaide CBD & Inner Metro',
  'Adelaide Hills & Mount Barker',
  'Eastern & North-Eastern Suburbs',
  'Western Suburbs & Port Adelaide',
  'Southern Suburbs & Fleurieu Peninsula',
  'Barossa Valley & Gawler',
  'Regional SA (Riverland / Limestone Coast)',
];
