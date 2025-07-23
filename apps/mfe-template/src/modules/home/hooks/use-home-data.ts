// Example business logic hook
// This is a placeholder - replace with actual home feature logic

import type { HomeData } from "../types/home.types";
import { useEffect, useState } from "react";
import { homeApi } from "../services/home.api";

export function useHomeData() {
  const [data, setData] = useState<HomeData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await homeApi.getData();
      setData(result);
    }
    catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
