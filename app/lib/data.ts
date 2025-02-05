import { RawProduct, Product, DetailedProduct } from '@/app/lib/definitions';

/**
 * Fetches products belonging to a specific category.
 * @param category - The category name.
 * @returns A promise resolving to an array of products.
 */
export function getCategoryProducts(category: string) {
  console.log(`Fetching products for category: ${category}`);
  return getProducts(`https://dummyjson.com/products/category/${category}?select=id,title,price,rating,stock,images`);
}

/**
 * Fetches products based on a search query.
 * @param query - The search query string.
 * @returns A promise resolving to an array of matching products.
 */
export function getQueryProducts(query: string) {
  console.log(`Fetching products for query: ${query}`);
  return getProducts(`https://dummyjson.com/products/search?q=${query}&select=id,title,price,rating,stock,images`);
}

/**
 * Fetches all available products.
 * @returns A promise resolving to an array of all products.
 */
export function getAllProducts() {
  console.log("Fetching all products");
  return getProducts('https://dummyjson.com/products?select=id,title,price,rating,stock,images');
}

// Type definition for response data from the API
type PackedRawProducts = { products: RawProduct[] };

/**
 * Generic function to fetch product data from a given URL.
 * @param url - The API endpoint URL.
 * @returns A promise resolving to an array of formatted product objects.
 */
async function getProducts(url: string): Promise<Product[]> {
  let products: Product[] = [];

  try {
    console.log(`Fetching products from URL: ${url}`);

    const response = await fetch(url);

    // Check if the response is valid
    if (!response.ok) {
      console.error(`Failed to fetch products. Status: ${response.status}, URL: ${url}`);
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    // Parse response JSON
    const data: PackedRawProducts = await response.json();

    if (data && data.products) {
      console.log(`Fetched ${data.products.length} products successfully`);

      // Map and format the raw product data
      products = await Promise.all(
        data.products.map(async (product: RawProduct) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          rating: product.rating,
          stock: product.stock,
          image: product.images[0], // Use the first image from the array
        }))
      );
    } else {
      console.warn("No products found in the response data");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error('Failed to fetch products');
  }

  return products;
}

/**
 * Fetches a single product by ID.
 * @param id - The product ID.
 * @returns A promise resolving to a detailed product object.
 */
export async function getSingleProduct(id: number): Promise<DetailedProduct> {
  console.log(`Fetching details for product ID: ${id}`);

  let product: DetailedProduct | null = null;

  try {
    const url = `https://dummyjson.com/products/${id}?select=id,title,description,category,price,rating,stock,tags,brand,sku,weight,dimensions,warrantyInformation,shippingInformation,reviews,returnPolicy,images`;
    
    console.log(`Fetching product from URL: ${url}`);
    
    const response = await fetch(url);

    // Check if the response is valid
    if (!response.ok) {
      console.error(`Failed to fetch product with ID: ${id}. Status: ${response.status}`);
      throw new Error(`Failed to fetch product with ID: ${id}`);
    }

    // Parse response JSON
    const data = await response.json();
    console.log(`Fetched product details: ${data.title} (ID: ${id})`);

    // Format the fetched product data
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
    console.error(`Error fetching product with ID: ${id}:`, error);
    throw new Error(`Failed to fetch product with ID: ${id}`);
  }

  return product;
}
