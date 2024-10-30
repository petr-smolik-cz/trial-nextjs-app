"use client";
import useSWR from 'swr';
import { Product, DetailedProduct } from '@/app/lib/definitions';
//import sharp from 'sharp';

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useFiltredProducts(category: string, query: string) {
  var urlRequest: string;
  if (query) {
    urlRequest = `https://dummyjson.com/products/search?q=${query}?select=id,title,price,rating,stock,images`;
  }
  else {
    urlRequest = `https://dummyjson.com/products/category/${category}?select=id,title,price,rating,stock,images`;
  } 
  return useProducts(urlRequest);
}

export function useAllProducts() {
   return useProducts('https://dummyjson.com/products?select=id,title,price,rating,stock,images')
}

/*export function useCategoryProducts(category: string) {
  return useFetcher(`https://dummyjson.com/products/category/${category}`)
}*/

/*export function useSearchProducts(query: string) {
  return useFetcher(`https://dummyjson.com/products/search?q=${query}`)
}*/

export function useProductCategories() {
  const { data, error: errorConst, isLoading } = useSWR<string[]>('https://dummyjson.com/products/category-list', fetcher);
  var error = errorConst;
  console.log(data);

  if (!data && !isLoading) {
    error = true;
  }

  return {
    categories: data,
    isLoading,
    isError: Boolean(error)
  }
}

type PackedProducts = { products: Product[] };

async function downloadImage(imageUrl: string): Promise<Buffer> {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/*async function resizeImage(imageBuffer: Buffer, width: number, height: number): Promise<Buffer> {
  return await sharp(imageBuffer).resize(width, height).toBuffer();
}

async function resizeImages(imageUrls: string[], width: number, height: number): Promise<string[]> {
  return await Promise.all(
    imageUrls.map(async (imageUrl: string) => {
      const imageBuffer = await downloadImage(imageUrl); // Fetch image as Buffer
      const resizedImageBuffer = await resizeImage(imageBuffer, width, height); // Resize image
      return resizedImageBuffer.toString('base64'); // Convert buffer to base64 string
    })
  );
}*/

function useProducts(url: string) {
    const { data, error: errorConst, isLoading } = useSWR<PackedProducts>(url, fetcher);
    var error = errorConst;
    console.log(data);

    let products: Product[] = [];

    if (data && data.products) {
      /*products = await Promise.all(
         data.products.map(async (product: any) => {  
          const resizedImages = await resizeImages(product.images, 300, 300);
          return {
            id: product.id,
            title: product.title,
            price: product.price,
            rating: product.rating,
            stock: product.stock,
            images: resizedImages,
          };
        })
      );*/
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
      isError: Boolean(error)
    }
  }

export function useSingleProduct(id: number) {
  console.log("Trying to fetch product with id: " + id);
  const { data, error: errorConst, isLoading } = useSWR<DetailedProduct>('https://dummyjson.com/products/' + id 
    + `?select=id,title,description,category,price,rating,stock,tags,brand,sku,weight,dimensions,
    warrantyInformation,shippingInformation,reviews,returnPolicy,images`, fetcher);
  var error = errorConst;
  console.log("Data of single product:", data);

  let product: DetailedProduct | null = null;

  if (data) {
    const p = data;

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
      images: p.images,
    };
  } else if (!isLoading) {
    error = true;
  }

  console.log("Was fetching successful:", !error);

  return {
    product,
    isLoading,
    isError: Boolean(error)
  }
}
