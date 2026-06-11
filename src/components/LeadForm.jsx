import React, { useState } from 'react';
import { useT } from '../lib/lang.jsx';
import { saveLead } from '../lib/lead.js';

const NCR_CITIES = ['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad', 'Greater Noida', 'Other'];

export default function LeadForm({ onSuccess }) {
  const t = useT();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', city: '', stage: '', problem: '', source: ''
  });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function validate() {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Required';
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) e.phone = 'Enter a valid number';
    if (!form.city) e.city = 'Required';
    if (!form.stage) e.stage = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);
    try {
      saveLead(form);
      onSuccess && onSuccess();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label className="label" htmlFor="name">{t.form.name} *</label>
        <input id="name" className="input" value={form.name} onChange={set('name')} autoComplete="name" />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="phone">{t.form.phone} *</label>
          <input
            id="phone" className="input" inputMode="tel" autoComplete="tel"
            placeholder="+91 98XXXXXXXX" value={form.phone} onChange={set('phone')}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label className="label" htmlFor="city">{t.form.city} *</label>
          <select id="city" className="input" value={form.city} onChange={set('city')}>
            <option value="">—</option>
            {NCR_CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
        </div>
      </div>

      <div>
        <label className="label" htmlFor="stage">{t.form.stage} *</label>
        <select id="stage" className="input" value={form.stage} onChange={set('stage')}>
          <option value="">—</option>
          {t.form.stages.map((s) => <option key={s}>{s}</option>)}
        </select>
        {errors.stage && <p className="mt-1 text-xs text-red-600">{errors.stage}</p>}
      </div>

      <div>
        <label className="label" htmlFor="problem">{t.form.problem}</label>
        <textarea
          id="problem" rows={3} className="input resize-none"
          placeholder={t.form.problemPh} value={form.problem} onChange={set('problem')}
        />
      </div>

      <div>
        <label className="label" htmlFor="source">{t.form.source}</label>
        <select id="source" className="input" value={form.source} onChange={set('source')}>
          <option value="">—</option>
          {t.form.sources.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <button type="submit" className="btn-primary w-full" disabled={submitting}>
        {submitting ? t.form.submitting : t.form.submit}
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <p className="text-center text-[11px] text-brand-navy/60">{t.form.consent}</p>
    </form>
  );
}
