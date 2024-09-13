"use client";
import useSWR from 'swr';
import { Product } from '@/app/lib/definitions';

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useFiltredProducts(category: string, query: string) {
  var urlRequest: string;
  if (query) {
    urlRequest = `https://dummyjson.com/products/search?q=${query}`;
  }
  else {
    urlRequest = `https://dummyjson.com/products/category/${category}`;
  } 
  return useFetcher(urlRequest);
}

export function useAllProducts() {
   return useFetcher('https://dummyjson.com/products')
}

/*export function useCategoryProducts(category: string) {
  return useFetcher(`https://dummyjson.com/products/category/${category}`)
}*/

/*export function useSearchProducts(query: string) {
  return useFetcher(`https://dummyjson.com/products/search?q=${query}`)
}*/

export function useProductCategories() {
  const { data, error, isLoading } = useSWR('https://dummyjson.com/products/category-list', fetcher);
 
  console.log(data);

  return {
    categories: data,
    isLoading,
    isError: error
  }
}

function useFetcher(url: string) {
    const { data, error: errorConst, isLoading } = useSWR(url, fetcher);
    var error = errorConst;
    console.log(data);

    let products: Product[] = [];

    if (data && data.products) {
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
    } else {
      error = true;
    }

    return {
      products: products,
      isLoading,
      isError: error
    }
  }
