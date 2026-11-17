import { useState, useEffect, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { SA_REGIONS, TRADE_PRESETS } from '../data/consultancyData';

interface ContactFormProps {
  prefilledTrade?: string;
  prefilledBudget?: number;
}

interface FormState {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  region: string;
  trade: string;
  budgetRange: string;
  notes: string;
}

interface FormErrors {
  businessName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
}

const BUDGET_TIERS = [
  '$1,500 – $2,500 / month',
  '$2,500 – $4,000 / month',
  '$4,000 – $6,500 / month',
  'Website rebuild project ($4,500+)',
];

function budgetToTier(amount?: number): string {
  if (!amount) return BUDGET_TIERS[1];
  if (amount <= 2500) return BUDGET_TIERS[0];
  if (amount <= 4000) return BUDGET_TIERS[1];
  return BUDGET_TIERS[2];
}

export function ContactForm({ prefilledTrade, prefilledBudget }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    region: SA_REGIONS[0],
    trade: prefilledTrade || TRADE_PRESETS[0].label,
    budgetRange: budgetToTier(prefilledBudget),
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedSummary, setSubmittedSummary] = useState<FormState | null>(null);

  useEffect(() => {
    if (prefilledTrade || prefilledBudget) {
      setForm((prev) => ({
        ...prev,
        trade: prefilledTrade || prev.trade,
        budgetRange: prefilledBudget ? budgetToTier(prefilledBudget) : prev.budgetRange,
      }));
    }
  }, [prefilledTrade, prefilledBudget]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.businessName.trim() || form.businessName.trim().length < 2) {
      nextErrors.businessName = 'Enter your business or trading name.';
    }
    if (!form.contactName.trim() || form.contactName.trim().length < 2) {
      nextErrors.contactName = 'Enter your name so we know who to ask for.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid business email address.';
    }

    const cleanedPhone = form.phone.replace(/[\s()-]/g, '');
    const auPhoneRegex = /^(?:\+?61|0)[23478]\d{8}$/;
    if (!auPhoneRegex.test(cleanedPhone)) {
      nextErrors.phone = 'Enter a valid Australian mobile or 08 landline number.';
    }

    return nextErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmittedSummary({ ...form });
  };

  if (submittedSummary) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-[#121418] border border-white/[0.12] rounded-xl p-8"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-xs font-medium text-emerald-400">
              Audit Request Confirmed
            </p>
            <h3 className="font-display text-2xl font-semibold text-neutral-50 mt-1">
              Thanks, {submittedSummary.contactName}. Your Adelaide suburb audit is queued.
            </h3>
            <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
              We are reviewing Google Maps rankings, local competitor ad spend, and website speed for{' '}
              <span className="text-neutral-50 font-medium">{submittedSummary.businessName}</span> across{' '}
              <span className="text-neutral-50 font-medium">{submittedSummary.region}</span>. Our Adelaide
              strategy director will call{' '}
              <span className="font-mono-tabular text-neutral-50">{submittedSummary.phone}</span> within
              one business day with your 10-minute video teardown.
            </p>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/[0.08] text-sm">
              <div>
                <dt className="text-xs text-neutral-400">Sector</dt>
                <dd className="text-neutral-100 font-medium mt-0.5">{submittedSummary.trade}</dd>
              </div>
              <div>
                <dt className="text-xs text-neutral-400">Target Investment</dt>
                <dd className="text-neutral-100 font-medium mt-0.5">{submittedSummary.budgetRange}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => {
                setSubmittedSummary(null);
                setForm((prev) => ({ ...prev, businessName: '', contactName: '', email: '', phone: '', notes: '' }));
              }}
              className="mt-6 px-4 py-2 text-xs font-medium text-neutral-200 border border-white/[0.14] hover:border-white/[0.3] rounded-lg transition-colors cursor-pointer"
            >
              Submit Another Business Enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[#121418] border border-white/[0.08] rounded-xl p-6 md:p-8 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="businessName" className="block text-xs font-medium text-neutral-300 mb-2">
            Business Name *
          </label>
          <input
            id="businessName"
            type="text"
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
            placeholder="e.g. Torrens Valley Plumbing"
            aria-invalid={Boolean(errors.businessName)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#0A0B0D] text-neutral-100 placeholder:text-neutral-500 border border-white/[0.12] rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
          />
          {errors.businessName && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.businessName}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contactName" className="block text-xs font-medium text-neutral-300 mb-2">
            Your Name *
          </label>
          <input
            id="contactName"
            type="text"
            value={form.contactName}
            onChange={(e) => setForm({ ...form, contactName: e.target.value })}
            placeholder="e.g. Sam Cooper"
            aria-invalid={Boolean(errors.contactName)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#0A0B0D] text-neutral-100 placeholder:text-neutral-500 border border-white/[0.12] rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
          />
          {errors.contactName && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.contactName}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-neutral-300 mb-2">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="sam@torrensplumbing.com.au"
            aria-invalid={Boolean(errors.email)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#0A0B0D] text-neutral-100 placeholder:text-neutral-500 border border-white/[0.12] rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
          />
          {errors.email && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-neutral-300 mb-2">
            Phone Number (SA / Mobile) *
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="0412 345 678"
            aria-invalid={Boolean(errors.phone)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#0A0B0D] text-neutral-100 placeholder:text-neutral-500 border border-white/[0.12] rounded-lg focus:outline-none focus:border-amber-500 transition-colors font-mono-tabular"
          />
          {errors.phone && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="region" className="block text-xs font-medium text-neutral-300 mb-2">
            Primary SA Service Area
          </label>
          <select
            id="region"
            value={form.region}
            onChange={(e) => setForm({ ...form, region: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-[#0A0B0D] text-neutral-100 border border-white/[0.12] rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
          >
            {SA_REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="trade" className="block text-xs font-medium text-neutral-300 mb-2">
            Industry / Trade
          </label>
          <select
            id="trade"
            value={form.trade}
            onChange={(e) => setForm({ ...form, trade: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-[#0A0B0D] text-neutral-100 border border-white/[0.12] rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
          >
            {TRADE_PRESETS.map((preset) => (
              <option key={preset.id} value={preset.label}>
                {preset.label}
              </option>
            ))}
            <option value="Other SA Service Business">Other SA Service Business</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="budgetRange" className="block text-xs font-medium text-neutral-300 mb-2">
          Monthly Growth Investment Range
        </label>
        <select
          id="budgetRange"
          value={form.budgetRange}
          onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
          className="w-full px-3.5 py-2.5 text-sm bg-[#0A0B0D] text-neutral-100 border border-white/[0.12] rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
        >
          {BUDGET_TIERS.map((tier) => (
            <option key={tier} value={tier}>
              {tier}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-xs font-medium text-neutral-300 mb-2">
          What jobs or suburbs do you want more of? (Optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="e.g. More residential switchboard upgrades and battery installs across the Adelaide Hills."
          className="w-full px-3.5 py-2.5 text-sm bg-[#0A0B0D] text-neutral-100 placeholder:text-neutral-500 border border-white/[0.12] rounded-lg focus:outline-none focus:border-amber-500 transition-colors resize-none"
        />
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-neutral-400">
          Direct Adelaide team response within 1 business day. Zero lock-in retainers.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[#0A0B0D] bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400"
        >
          <span>Request Free Suburb Audit</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
