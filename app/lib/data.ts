
import { RawProduct, Product, DetailedProduct } from '@/app/lib/definitions';

export function getCategoryProducts(category: string) {
  return getProducts(`https://dummyjson.com/products/category/${category}?select=id,title,price,rating,stock,images`);
}

export function getQueryProducts(query: string) {
  return getProducts(`https://dummyjson.com/products/search?q=${query}&select=id,title,price,rating,stock,images`);
}

export function getAllProducts() {
   return getProducts('https://dummyjson.com/products?select=id,title,price,rating,stock,images')
}

type PackedRawProducts = { products: RawProduct[] };

async function getProducts(url: string): Promise<Product[]> {
  let products: Product[] = [];

  console.log("Trying to fetch products: ", url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error("Error fetching products");
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    // Parse response data
    const data: PackedRawProducts = await response.json();

    if (data && data.products) {
      products = await Promise.all(
         data.products.map(async (product: RawProduct) => {  
          return {
            id: product.id,
            title: product.title,
            price: product.price,
            rating: product.rating,
            stock: product.stock,
            image: product.images[0],
          };
        })
      );
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error('Failed to fetch products');
  }

  return products;
}

  export async function getSingleProduct(id: number): Promise<DetailedProduct> {
    console.log("Trying to fetch product with id:", id);
  
    let product: DetailedProduct | null = null;
  
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${id}?select=id,title,description,category,price,rating,stock,tags,brand,sku,weight,dimensions,warrantyInformation,shippingInformation,reviews,returnPolicy,images`
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch product with id: ${id}`);
      }
  
      const data = await response.json();
      console.log("Single product:", data);
  
      product = {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        rating: data.rating,
        stock: data.stock,
        tags: data.tags,
        brand: data.brand,
        sku: data.sku,
        weight: data.weight,
        dimensions: {
          width: data.dimensions.width,
          height: data.dimensions.height,
          depth: data.dimensions.depth,
        },
        warrantyInformation: data.warrantyInformation,
        shippingInformation: data.shippingInformation,
        reviews: data.reviews,
        returnPolicy: data.returnPolicy,
        images: data.images,
      };
    } catch (error) {
      console.error(`Error fetching product with id: ${id}:`, error);
      throw new Error(`Failed to fetch product with id: ${id}`);
    }
  
    return product;
  }
