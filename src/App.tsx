import { useState } from 'react';
import { ArrowRight, Check, MapPin, Phone, Mail } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ResilientImage } from './components/ResilientImage';
import heroImg from './assets/images/hero_adelaide_studio_1794824164721.jpg';
import founderImg from './assets/images/founder_adelaide_consultant_1794824167479.jpg';
import { RoiEstimator } from './components/RoiEstimator';
import { ContactForm } from './components/ContactForm';
import {
  CAPABILITIES,
  CASE_STUDIES,
  HERO_PROOF_METRICS,
  SUBURB_SEARCH_PREVIEWS,
  type IndustryFilter,
} from './data/consultancyData';

const INDUSTRY_TABS: { id: IndustryFilter; label: string }[] = [
  { id: 'all', label: 'All Industries' },
  { id: 'trades', label: 'Trades & Construction' },
  { id: 'health', label: 'Health & Clinics' },
  { id: 'hospitality', label: 'Retail & Hospitality' },
];

export default function App() {
  const [activeSuburbIdx, setActiveSuburbIdx] = useState(0);
  const [industryFilter, setIndustryFilter] = useState<IndustryFilter>('all');
  const [prefilledTrade, setPrefilledTrade] = useState<string | undefined>(undefined);
  const [prefilledBudget, setPrefilledBudget] = useState<number | undefined>(undefined);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyEstimate = (tradeLabel: string, monthlyBudget: number) => {
    setPrefilledTrade(tradeLabel);
    setPrefilledBudget(monthlyBudget);
    scrollToContact();
  };

  const filteredCases =
    industryFilter === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === industryFilter);

  const activeSuburb = SUBURB_SEARCH_PREVIEWS[activeSuburbIdx];

  return (
    <div id="top" className="min-h-screen bg-[#0A0B0D] text-[#F4F5F7]">
      <Navbar onBookClick={scrollToContact} />

      <main>
        {/* 1. Hero Section */}
        <section className="pt-12 pb-16 md:pt-16 md:pb-20 border-b border-white/[0.08]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Hero Proposition */}
              <div className="lg:col-span-6 flex flex-col justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-amber-400">
                    Adelaide &amp; South Australia · Trades &amp; Local Business Growth
                  </p>
                  <h1 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-neutral-50 mt-4 text-balance">
                    More booked jobs for South Australian trades and local businesses.
                  </h1>
                  <p className="text-base md:text-lg text-neutral-300 leading-relaxed mt-6 max-w-xl">
                    We build local search authority, high-converting websites, and call-tracked
                    Google Ads engines for SA sparkies, plumbers, builders, clinics, and local
                    operators who want predictable weekly work without paying shared lead
                    aggregators.
                  </p>
                </div>

                <div className="mt-8 pt-6 flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0A0B0D] bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                  >
                    <span>Book Strategy Call</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <a
                    href="#results"
                    className="py-2 text-sm font-medium text-neutral-200 hover:text-amber-400 border-b border-white/[0.2] hover:border-amber-400 transition-colors whitespace-nowrap shrink-0"
                  >
                    Explore SA Client Results
                  </a>
                </div>
              </div>

              {/* Hero Studio Visual */}
              <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-white/[0.08] min-h-[300px] lg:min-h-[440px]">
                <ResilientImage
                  src={heroImg}
    alt="Elevate Digital SA consultancy strategy meeting..."
                  className="w-full h-full lg:h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0A0B0D]/90 via-[#0A0B0D]/25 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-medium text-amber-400">
                    Pirie Street Studio · Adelaide CBD
                  </p>
                  <p className="text-sm text-neutral-200 mt-1">
                    Serving Greater Adelaide, Adelaide Hills, Barossa Valley &amp; Fleurieu Peninsula
                  </p>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Proof Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-10 border-t border-white/[0.08]">
              {HERO_PROOF_METRICS.map((metric) => (
                <div key={metric.label} className="space-y-1.5">
                  <p className="font-mono-tabular text-2xl md:text-3xl font-semibold text-neutral-50">
                    {metric.value}
                  </p>
                  <p className="text-sm font-medium text-neutral-200">{metric.label}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed">{metric.context}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Core Capabilities Bento Grid */}
        <section id="capabilities" className="py-16 md:py-24 border-b border-white/[0.08]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-amber-400">Core Capabilities</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-50 mt-2 text-balance">
                Built around the phone ringing, not vanity impressions
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed mt-4">
                Every system we deploy is engineered for South Australian search habits, local
                suburb trust, and fast quote turnaround.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
              {CAPABILITIES.map((cap, idx) => {
                const isWide = cap.span === 'wide';
                return (
                  <article
                    key={cap.number}
                    className={`bg-[#121418] border border-white/[0.08] rounded-xl p-6 md:p-8 flex flex-col justify-between ${
                      isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                    }`}
                  >
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-xl md:text-2xl font-semibold text-neutral-50">
                          <span className="font-mono-tabular text-amber-400 mr-2.5">
                            {cap.number}
                          </span>
                          {cap.title}
                        </h3>
                      </div>

                      <p className="text-sm md:text-base text-neutral-300 leading-relaxed mt-4">
                        {cap.summary}
                      </p>

                      {/* Interactive Suburb Search Benchmark inside Capability 01 */}
                      {idx === 0 && (
                        <div className="mt-6 pt-6 border-t border-white/[0.08]">
                          <p className="text-xs font-medium text-neutral-400 mb-3">
                            Live SA Suburb Search Benchmarks
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {SUBURB_SEARCH_PREVIEWS.map((item, subIdx) => (
                              <button
                                key={item.suburb}
                                type="button"
                                onClick={() => setActiveSuburbIdx(subIdx)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                  activeSuburbIdx === subIdx
                                    ? 'bg-amber-500 text-[#0A0B0D] border-amber-500 font-semibold'
                                    : 'bg-[#0A0B0D] text-neutral-300 border-white/[0.1] hover:border-white/[0.25]'
                                }`}
                              >
                                {item.suburb.split(' & ')[0]}
                              </button>
                            ))}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/[0.06]">
                            <div>
                              <p className="text-xs text-neutral-400">Target Search Query</p>
                              <p className="text-xs font-mono-tabular text-neutral-100 mt-1">
                                &ldquo;{activeSuburb.searchTerm}&rdquo;
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-neutral-400">Map Position</p>
                              <p className="text-sm font-mono-tabular font-semibold text-amber-400 mt-1">
                                {activeSuburb.mapRank}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-neutral-400">Enquiry Volume &amp; Cost</p>
                              <p className="text-sm font-mono-tabular font-semibold text-neutral-100 mt-1">
                                {activeSuburb.monthlyCalls} calls/mo · {activeSuburb.costPerLead}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <ul className="mt-6 space-y-2.5">
                        {cap.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-neutral-300"
                          >
                            <Check
                              className="w-4 h-4 text-amber-400 shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                      <span className="text-xs text-neutral-400">Benchmark Outcome</span>
                      <span className="font-mono-tabular text-xs font-medium text-amber-400 text-right">
                        {cap.outcomeMetric}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Proof of Impact & Attributable SA Case Studies */}
        <section id="results" className="py-16 md:py-24 border-b border-white/[0.08]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-sm font-medium text-amber-400">Verified South Australian Results</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-50 mt-2 text-balance">
                  Local businesses measuring growth in booked work
                </h2>
              </div>

              {/* Interactive Industry Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter case studies by South Australian industry"
                className="flex flex-wrap gap-1.5 p-1 bg-[#121418] border border-white/[0.08] rounded-lg self-start"
              >
                {INDUSTRY_TABS.map((tab) => {
                  const isActive = industryFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      onClick={() => setIndustryFilter(tab.id)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-500 ${
                        isActive
                          ? 'bg-amber-500 text-[#0A0B0D] font-semibold'
                          : 'text-neutral-300 hover:text-neutral-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
              {filteredCases.map((study) => (
                <article
                  key={study.id}
                  className="bg-[#121418] border border-white/[0.08] rounded-xl overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden border-b border-white/[0.08]">
                      <ResilientImage
                        src={study.imageSrc}
                        alt={study.imageAlt}
                        fallbackTitle={study.client}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6">
                      {/* Unboxed metadata with typographic separator */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                        <span>{study.suburb}</span>
                        <span aria-hidden="true">·</span>
                        <span>{study.categoryLabel}</span>
                      </div>

                      <h3 className="font-display text-xl font-semibold text-neutral-50 mt-2">
                        {study.client}
                      </h3>

                      <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-1">
                        <p className="font-mono-tabular text-base font-semibold text-amber-400">
                          {study.headlineMetric}
                        </p>
                        <p className="font-mono-tabular text-xs text-neutral-300">
                          {study.secondaryMetric}
                        </p>
                      </div>

                      <p className="text-sm text-neutral-300 leading-relaxed mt-4">
                        {study.execution}
                      </p>
                    </div>
                  </div>

                  {/* Adjacent Attributable Client Testimonial */}
                  <blockquote className="px-6 pb-6 pt-5 border-t border-white/[0.08] bg-[#0E1014]">
                    <p className="text-xs text-neutral-300 leading-relaxed italic">
                      &ldquo;{study.quote.text}&rdquo;
                    </p>
                    <footer className="mt-3">
                      <p className="text-xs font-semibold text-neutral-100">
                        {study.quote.author}
                      </p>
                      <p className="text-xs text-neutral-400">{study.quote.role}</p>
                    </footer>
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Interactive Estimator & Adelaide Strategy Director */}
        <section id="estimator" className="py-16 md:py-24 border-b border-white/[0.08]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-8">
                <RoiEstimator onApplyEstimate={handleApplyEstimate} />
              </div>

              <aside
                id="about"
                className="lg:col-span-4 bg-[#121418] border border-white/[0.08] rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div className="aspect-[3/4] w-full max-h-[340px] overflow-hidden border-b border-white/[0.08]">
                  <ResilientImage
                    src={founderImg}
                    alt="Matthew Gallagher, Principal Strategy Director at Elevate Digital SA in Adelaide"
                    fallbackTitle="Matthew Gallagher · Principal Strategist"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-medium text-amber-400">
                      Local Accountability · No Offshore Hand-Offs
                    </p>
                    <h3 className="font-display text-xl font-semibold text-neutral-50 mt-1.5">
                      Work directly with our Adelaide team
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed mt-3">
                      Every account is managed from our Pirie Street studio by strategists who know
                      the difference between Henley Beach and Gawler search intent. We cap active
                      clients per trade per postcode so we never pit two clients against each other.
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/[0.08] space-y-2 text-xs text-neutral-300">
                    <p className="font-semibold text-neutral-100">
                      Matthew Gallagher · Principal Director
                    </p>
                    <div className="flex items-center gap-2 text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                      <span>Level 4, 89 Pirie Street, Adelaide SA 5000</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400">
                      <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                      <span className="font-mono-tabular">(08) 7099 4210</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 5. Lead Capture & Suburb Audit */}
        <section id="contact" className="py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <p className="text-sm font-medium text-amber-400">
                  Complimentary Suburb &amp; Search Audit
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-50 mt-2 text-balance">
                  See exactly where your competitors are winning your local jobs
                </h2>
                <p className="text-base text-neutral-300 leading-relaxed mt-4">
                  Tell us your trade and primary Adelaide or regional SA suburbs. We record a
                  custom 10-minute video teardown showing your exact Map Pack gaps, ad waste, and a
                  fixed-scope 90-day plan.
                </p>

                <ol className="mt-8 space-y-5 pt-8 border-t border-white/[0.08]">
                  <li className="flex items-start gap-4">
                    <span className="font-mono-tabular text-sm font-semibold text-amber-400 pt-0.5">
                      01.
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-neutral-100">
                        Suburb Map Pack &amp; Competitor Check
                      </p>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        We map how your Google Business Profile ranks across your highest-margin SA
                        postcodes.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="font-mono-tabular text-sm font-semibold text-amber-400 pt-0.5">
                      02.
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-neutral-100">
                        Website Speed &amp; Quote Friction Audit
                      </p>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        We test mobile call-button placement, quote form drop-off, and ServiceM8 /
                        CRM readiness.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="font-mono-tabular text-sm font-semibold text-amber-400 pt-0.5">
                      03.
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-neutral-100">
                        Postcode-Protected Roadmap
                      </p>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        Clear 90-day scope with transparent management fees and zero lock-in
                        contracts.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="lg:col-span-7">
                <ContactForm
                  prefilledTrade={prefilledTrade}
                  prefilledBudget={prefilledBudget}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Quiet Footer */}
      <footer className="border-t border-white/[0.08] bg-[#08090B] py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/[0.08]">
            <div className="md:col-span-5">
              <p className="font-display text-lg font-bold text-neutral-50">
                Elevate Digital SA
              </p>
              <p className="text-sm text-neutral-400 mt-3 max-w-sm leading-relaxed">
                Independent digital marketing consultancy for South Australian tradespeople,
                medical clinics, and local businesses.
              </p>
            </div>

            <div className="md:col-span-4">
              <p className="text-xs font-semibold text-neutral-200 mb-3">
                South Australian Regions Served
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Adelaide CBD · Norwood · Unley · Glenelg · Port Adelaide · Mount Barker · Adelaide
                Hills · Barossa Valley · McLaren Vale &amp; Victor Harbor
              </p>
            </div>

            <div className="md:col-span-3 space-y-2 text-xs text-neutral-400">
              <p className="font-semibold text-neutral-200 mb-3">Direct Contact</p>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:hello@elevatedigitalsa.com.au"
                  className="hover:text-neutral-100 transition-colors"
                >
                  hello@elevatedigitalsa.com.au
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                <span className="font-mono-tabular">(08) 7099 4210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                <span>89 Pirie Street, Adelaide SA 5000</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-500">
            <p>
              &copy; {new Date().getFullYear()} Elevate Digital SA Pty Ltd · ABN 48 619 304 812
            </p>
            <div className="flex items-center gap-6">
              <a href="#capabilities" className="hover:text-neutral-300 transition-colors">
                Capabilities
              </a>
              <a href="#results" className="hover:text-neutral-300 transition-colors">
                Results
              </a>
              <a href="#estimator" className="hover:text-neutral-300 transition-colors">
                Estimator
              </a>
              <a href="#contact" className="hover:text-neutral-300 transition-colors">
                Free Suburb Audit
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
