'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PLANS } from '@/config/plans';

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string | null, planKey: string) => {
    if (planKey === 'free') return;
    
    if (!isSignedIn) {
      window.location.href = `/sign-up?redirect_url=${window.location.pathname}`;
      return;
    }

    if (!priceId) return;

    setLoading(planKey);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">Start free. Upgrade when you need more.</p>
          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1">
            <button onClick={() => setAnnual(false)} className={`px-4 py-2 rounded-full text-sm transition-all ${!annual ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={`px-4 py-2 rounded-full text-sm transition-all ${annual ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              Annual <span className="text-emerald-400 text-xs ml-1">Save 20%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {Object.entries(PLANS).map(([key, plan], i) => {
            const isPopular = key === 'starter';
            const price = annual ? plan.priceAnnual : plan.price;
            return (
              <motion.div key={key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl p-6 ${isPopular ? 'bg-gradient-to-b from-blue-500/10 to-[#111128] border-2 border-blue-500/30 shadow-lg shadow-blue-500/10' : 'bg-[#111128] border border-white/10'}`}>
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="premium" size="md">Most Popular</Badge>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-1">{plan.displayName}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">${price}</span>
                    {price > 0 && <span className="text-gray-400 text-sm">/mo</span>}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => handleCheckout(plan.stripePriceId, key)} 
                  variant={isPopular ? 'primary' : 'outline'} 
                  className="w-full"
                  loading={loading === key}
                >
                  {key === 'free' ? 'Start Free' : 'Get Started'}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
