"use client";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useProductCategories() {
    const { data, error: errorConst, isLoading } = useSWR<string[]>('https://dummyjson.com/products/category-list', fetcher);
    var error = errorConst;
    console.log(data);
  
    return {
      categories: data,
      isLoading,
      isError: Boolean(error)
    }
  }