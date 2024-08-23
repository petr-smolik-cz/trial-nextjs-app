"use client";
import useSWR from 'swr';
import { Product } from '@/app/lib/definitions';

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useAllProducts() {
   return useFetcher('https://dummyjson.com/products')
}

export function useCategoryProducts(category: string) {
  return useFetcher(`https://dummyjson.com/products/category/${category}`)
}

export function useSearchProducts(query: string) {
  return useFetcher(`https://dummyjson.com/products/search?q=${query}`)
}


function useFetcher(url: string) {
    const { data, error, isLoading } = useSWR(url, fetcher);
   
    console.log(data);

    let products: Product[] = [];

    if (data) {
      products = data.products.map((product: any) => ({      
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
        thumbnail: product.thumbnail,
        images: product.images,
      }));
    }

    return {
      products: products,
      isLoading,
      isError: error
    }
  }

  export function useProductCategories() {
    const { data, error, isLoading } = useSWR('https://dummyjson.com/products/category-list', fetcher);
   
    console.log(data);

    return {
      categories: data,
      isLoading,
      isError: error
    }
  }
