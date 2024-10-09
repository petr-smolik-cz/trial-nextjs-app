"use client";
import useSWR from 'swr';
import { Product, DetailedProduct } from '@/app/lib/definitions';

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useFiltredProducts(category: string, query: string) {
  var urlRequest: string;
  if (query) {
    urlRequest = `https://dummyjson.com/products/search?q=${query}`;
  }
  else {
    urlRequest = `https://dummyjson.com/products/category/${category}`;
  } 
  return useProducts(urlRequest);
}

export function useAllProducts() {
   return useProducts('https://dummyjson.com/products')
}

/*export function useCategoryProducts(category: string) {
  return useFetcher(`https://dummyjson.com/products/category/${category}`)
}*/

/*export function useSearchProducts(query: string) {
  return useFetcher(`https://dummyjson.com/products/search?q=${query}`)
}*/

export function useProductCategories() {
  const { data, error: errorConst, isLoading } = useSWR('https://dummyjson.com/products/category-list', fetcher);
  var error = errorConst;
  console.log(data);

  if (!data && !isLoading) {
    error = true;
  }

  return {
    categories: data,
    isLoading,
    isError: error
  }
}

function useProducts(url: string) {
    const { data, error: errorConst, isLoading } = useSWR(url, fetcher);
    var error = errorConst;
    console.log(data);

    let products: Product[] = [];

    if (data && data.products) {
      products = data.products.map((product: any) => ({      
        id: product.id,
        title: product.title,
        price: product.price,
        rating: product.rating,
        stock: product.stock,
        images: product.images
      }));
    } else if (!isLoading) {
      error = true;
    }

    return {
      products,
      isLoading,
      isError: error
    }
  }

export function useSingleProduct(id: number) {
  const { data, error: errorConst, isLoading } = useSWR('https://dummyjson.com/products/' + id, fetcher);
  var error = errorConst;
  console.log(data);

  let product: DetailedProduct | null = null;

  if (data && data.product) {
    const p = data.product;

    product = {
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      price: p.price,
      rating: p.rating,
      stock: p.stock,
      tags: p.tags,
      brand: p.brand,
      sku: p.sku,
      weight: p.weight,
      dimensions: {
        width: p.dimensions.width,
        height: p.dimensions.height,
        depth: p.dimensions.depth,
      },
      warrantyInformation: p.warrantyInformation,
      shippingInformation: p.shippingInformation,
      reviews: p.reviews,
      returnPolicy: p.returnPolicy,
      thumbnail: p.thumbnail,
      images: p.images,
    };
  } else if (!isLoading) {
    error = true;
  }

  return {
    product,
    isLoading,
    isError: error
  }
}
