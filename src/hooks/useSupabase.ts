import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabase';
import { PostgrestError } from '@supabase/supabase-js';

interface FetchOptions {
  table: string;
  columns?: string;
  filters?: Record<string, any>;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  limit?: number;
  page?: number;
  equalTo?: Record<string, any>;
  notEqualTo?: Record<string, any>;
  greaterThan?: Record<string, any>;
  lessThan?: Record<string, any>;
  greaterThanOrEqual?: Record<string, any>;
  lessThanOrEqual?: Record<string, any>;
  like?: Record<string, any>;
  ilike?: Record<string, any>;
  in?: Record<string, any[]>;
  is?: Record<string, any>;
  rangeGt?: Record<string, any>;
  rangeLt?: Record<string, any>;
  rangeGte?: Record<string, any>;
  rangeLte?: Record<string, any>;
  textSearch?: Record<string, any>;
  match?: Record<string, any>;
}

interface MutationOptions {
  table: string;
  data: any;
  id?: string;
  conflictTarget?: string;
}

interface UseSupabaseReturn<T> {
  data: T[] | null;
  count: number | null;
  error: PostgrestError | null;
  loading: boolean;
  fetchData: () => Promise<void>;
  insert: (data: Partial<T>) => Promise<{ data: T | null; error: PostgrestError | null }>;
  update: (id: string, data: Partial<T>) => Promise<{ data: T | null; error: PostgrestError | null }>;
  remove: (id: string) => Promise<{ data: T | null; error: PostgrestError | null }>;
  getById: (id: string) => Promise<{ data: T | null; error: PostgrestError | null }>;
}

/**
 * Custom hook for Supabase data operations
 * Provides CRUD functionality with advanced filtering options
 */
function useSupabase<T>(options: FetchOptions): UseSupabaseReturn<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const buildQuery = useCallback(() => {
    let query = supabase
      .from(options.table)
      .select(options.columns || '*', { count: 'exact' });

    // Apply filters
    if (options.equalTo) {
      Object.entries(options.equalTo).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    if (options.notEqualTo) {
      Object.entries(options.notEqualTo).forEach(([key, value]) => {
        query = query.neq(key, value);
      });
    }

    if (options.greaterThan) {
      Object.entries(options.greaterThan).forEach(([key, value]) => {
        query = query.gt(key, value);
      });
    }

    if (options.lessThan) {
      Object.entries(options.lessThan).forEach(([key, value]) => {
        query = query.lt(key, value);
      });
    }

    if (options.greaterThanOrEqual) {
      Object.entries(options.greaterThanOrEqual).forEach(([key, value]) => {
        query = query.gte(key, value);
      });
    }

    if (options.lessThanOrEqual) {
      Object.entries(options.lessThanOrEqual).forEach(([key, value]) => {
        query = query.lte(key, value);
      });
    }

    if (options.like) {
      Object.entries(options.like).forEach(([key, value]) => {
        query = query.like(key, value);
      });
    }

    if (options.ilike) {
      Object.entries(options.ilike).forEach(([key, value]) => {
        query = query.ilike(key, value);
      });
    }

    if (options.in) {
      Object.entries(options.in).forEach(([key, value]) => {
        query = query.in(key, value);
      });
    }

    if (options.is) {
      Object.entries(options.is).forEach(([key, value]) => {
        query = query.is(key, value);
      });
    }

    if (options.textSearch) {
      Object.entries(options.textSearch).forEach(([key, value]) => {
        query = query.textSearch(key, value);
      });
    }

    if (options.match) {
      Object.entries(options.match).forEach(([key, value]) => {
        query = query.match(key, value);
      });
    }

    // Apply ordering
    if (options.orderBy) {
      query = query.order(options.orderBy, {
        ascending: options.orderDirection === 'asc',
      });
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.page && options.limit) {
      const offset = (options.page - 1) * options.limit;
      query = query.range(offset, offset + options.limit - 1);
    }

    return query;
  }, [options]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const query = buildQuery();
      const { data: result, error: queryError, count: countResult } = await query;

      if (queryError) {
        setError(queryError);
        setData(null);
      } else {
        setData(result as T[]);
        setCount(countResult);
      }
    } catch (err: any) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [buildQuery]);

  const insert = async (data: Partial<T>) => {
    try {
      return await supabase.from(options.table).insert(data).select().single();
    } catch (error) {
      console.error('Error inserting data:', error);
      return { data: null, error: error as PostgrestError };
    }
  };

  const update = async (id: string, data: Partial<T>) => {
    try {
      return await supabase
        .from(options.table)
        .update(data)
        .eq('id', id)
        .select()
        .single();
    } catch (error) {
      console.error('Error updating data:', error);
      return { data: null, error: error as PostgrestError };
    }
  };

  const remove = async (id: string) => {
    try {
      return await supabase
        .from(options.table)
        .delete()
        .eq('id', id)
        .select()
        .single();
    } catch (error) {
      console.error('Error deleting data:', error);
      return { data: null, error: error as PostgrestError };
    }
  };

  const getById = async (id: string) => {
    try {
      return await supabase
        .from(options.table)
        .select(options.columns || '*')
        .eq('id', id)
        .single();
    } catch (error) {
      console.error('Error fetching data by ID:', error);
      return { data: null, error: error as PostgrestError };
    }
  };

  // Fetch data on component mount or when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    count,
    error,
    loading,
    fetchData,
    insert,
    update,
    remove,
    getById,
  };
}

export default useSupabase;
