import { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { TRADE_PRESETS, type TradePreset } from '../data/consultancyData';

interface RoiEstimatorProps {
  onApplyEstimate: (tradeLabel: string, monthlyBudget: number) => void;
}

export function RoiEstimator({ onApplyEstimate }: RoiEstimatorProps) {
  const [selectedTrade, setSelectedTrade] = useState<TradePreset>(TRADE_PRESETS[0]);
  const [avgJobValue, setAvgJobValue] = useState<number>(TRADE_PRESETS[0].defaultJobValue);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(2800);

  const handleSelectTrade = (preset: TradePreset) => {
    setSelectedTrade(preset);
    setAvgJobValue(preset.defaultJobValue);
  };

  const projection = useMemo(() => {
    // 65% media + 35% management/conversion infrastructure model
    const estimatedLeads = Math.max(8, Math.round((monthlyInvestment * 0.85) / selectedTrade.avgCpl));
    const bookedJobs = Math.max(2, Math.round(estimatedLeads * selectedTrade.closeRate));
    const monthlyRevenue = bookedJobs * avgJobValue;
    const ninetyDayPipeline = monthlyRevenue * 3;
    const netRoas = (monthlyRevenue / monthlyInvestment).toFixed(1);

    return {
      estimatedLeads,
      bookedJobs,
      monthlyRevenue,
      ninetyDayPipeline,
      netRoas,
    };
  }, [avgJobValue, monthlyInvestment, selectedTrade]);

  const formatAud = (val: number) =>
    new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="bg-[#121418] border border-white/[0.08] rounded-xl p-6 md:p-8">
      <div className="flex flex-col gap-2 pb-6 border-b border-white/[0.08]">
        <p className="text-xs font-medium text-amber-400">
          90-Day South Australian Pipeline Estimator
        </p>
        <h3 className="font-display text-2xl font-semibold text-neutral-50 text-balance">
          Model your expected local enquiries before spending a dollar
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl">
          Benchmarked against active South Australian search click costs, suburb intent volume,
          and median client quote-to-job close rates.
        </p>
      </div>

      {/* Trade Selector */}
      <div className="pt-6">
        <span className="block text-xs font-medium text-neutral-300 mb-3">
          1. Select your trade or local sector
        </span>
        <div className="flex flex-wrap gap-2">
          {TRADE_PRESETS.map((preset) => {
            const isActive = preset.id === selectedTrade.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectTrade(preset)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-500 ${
                  isActive
                    ? 'bg-amber-500 text-[#0A0B0D] border-amber-500 font-semibold'
                    : 'bg-[#0A0B0D] text-neutral-300 border-white/[0.1] hover:border-white/[0.25] hover:text-neutral-50'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <label
              htmlFor="job-value-slider"
              className="text-xs font-medium text-neutral-300"
            >
              2. Average invoiced job value (AUD)
            </label>
            <span className="font-mono-tabular text-sm font-semibold text-neutral-50">
              {formatAud(avgJobValue)}
            </span>
          </div>
          <input
            id="job-value-slider"
            type="range"
            min={450}
            max={18000}
            step={250}
            value={avgJobValue}
            onChange={(e) => setAvgJobValue(Number(e.target.value))}
            className="sa-slider w-full"
          />
          <div className="flex justify-between text-xs text-neutral-500 font-mono-tabular mt-1.5">
            <span>$450</span>
            <span>$18,000</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <label
              htmlFor="investment-slider"
              className="text-xs font-medium text-neutral-300"
            >
              3. Monthly search &amp; growth budget (AUD)
            </label>
            <span className="font-mono-tabular text-sm font-semibold text-neutral-50">
              {formatAud(monthlyInvestment)}/mo
            </span>
          </div>
          <input
            id="investment-slider"
            type="range"
            min={1500}
            max={6500}
            step={250}
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            className="sa-slider w-full"
          />
          <div className="flex justify-between text-xs text-neutral-500 font-mono-tabular mt-1.5">
            <span>$1,500/mo</span>
            <span>$6,500/mo</span>
          </div>
        </div>
      </div>

      {/* Projection Output */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/[0.08]">
        <div>
          <p className="text-xs text-neutral-400">Est. Monthly Leads</p>
          <p className="font-mono-tabular text-2xl font-semibold text-neutral-50 mt-1">
            {projection.estimatedLeads}
          </p>
        </div>
        <div>
          <p className="text-xs text-neutral-400">Est. Booked Jobs / Mo</p>
          <p className="font-mono-tabular text-2xl font-semibold text-neutral-50 mt-1">
            {projection.bookedJobs}
          </p>
        </div>
        <div>
          <p className="text-xs text-neutral-400">Projected Return</p>
          <p className="font-mono-tabular text-2xl font-semibold text-amber-400 mt-1">
            {projection.netRoas}x
          </p>
        </div>
        <div>
          <p className="text-xs text-neutral-400">90-Day Pipeline</p>
          <p className="font-mono-tabular text-2xl font-semibold text-neutral-50 mt-1">
            {formatAud(projection.ninetyDayPipeline)}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-neutral-400">
          Assumes {Math.round(selectedTrade.closeRate * 100)}% quote-to-job close rate at ~${selectedTrade.avgCpl} SA cost per enquiry.
        </p>
        <button
          type="button"
          onClick={() => onApplyEstimate(selectedTrade.label, monthlyInvestment)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0A0B0D] bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400"
        >
          <span>Request Custom Suburb Audit</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
