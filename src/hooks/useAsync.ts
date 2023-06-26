import { useState, useEffect } from "react";

export const useAsync = <T extends unknown>(
  asyncFunction: () => Promise<T>,
  deps: any[]
): [T | null, boolean, any] => {
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await asyncFunction();
        setResult(response);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, deps);

  return [result, loading, error];
};
