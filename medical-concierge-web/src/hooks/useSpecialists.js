import { useState, useEffect, useRef } from 'react';

const FILTERS = ['All Specialties', 'Cardiology', 'Orthopedics', 'Oncology', 'Neurology', 'Stem Cell', 'Cosmetic'];

/**
 * Fetches specialist data from /data/specialists.json and provides
 * filtering helpers. Data is fetched once and cached in state.
 *
 * @returns {{ specialists: Array, filters: string[], loading: boolean, error: string|null }}
 */
export default function useSpecialists() {
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetched = useRef(false);

  useEffect(() => {
    // Prevent duplicate fetches in StrictMode / re-renders
    if (fetched.current) return;
    fetched.current = true;

    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('/data/specialists.json');
        if (!response.ok) {
          throw new Error(`Failed to load specialists (HTTP ${response.status})`);
        }
        const data = await response.json();
        if (!cancelled) {
          setSpecialists(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[useSpecialists] Fetch error:', err);
          setError(err.message || 'Failed to load specialists');
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
    specialists,
    filters: FILTERS,
    loading,
    error,
  };
}
