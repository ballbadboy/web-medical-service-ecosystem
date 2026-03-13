import { useState, useEffect, useRef } from 'react';

/**
 * Fetches pricing data from /data/pricing.json and provides
 * base prices and addon costs. Data is fetched once and cached in state.
 *
 * @returns {{ basePrices: Object, addons: Object, currency: string, loading: boolean, error: string|null }}
 */
export default function usePricing() {
  const [basePrices, setBasePrices] = useState({});
  const [addons, setAddons] = useState({});
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('/data/pricing.json');
        if (!response.ok) {
          throw new Error(`Failed to load pricing (HTTP ${response.status})`);
        }
        const data = await response.json();
        if (!cancelled) {
          setBasePrices(data.basePrices || {});
          setAddons(data.addons || {});
          setCurrency(data.currency || 'USD');
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[usePricing] Fetch error:', err);
          setError(err.message || 'Failed to load pricing');
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    basePrices,
    addons,
    currency,
    loading,
    error,
  };
}
