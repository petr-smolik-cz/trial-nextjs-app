
import { RawProduct, Product, DetailedProduct } from '@/app/lib/definitions';

export function getFiltredProducts(category: string, query: string) {
  var urlRequest: string;
  if (query) {
    urlRequest = `https://dummyjson.com/products/search?q=${query}?select=id,title,price,rating,stock,images`;
  }
  else {
    urlRequest = `https://dummyjson.com/products/category/${category}?select=id,title,price,rating,stock,images`;
  } 
  return getProducts(urlRequest);
}

export function getAllProducts() {
   return getProducts('https://dummyjson.com/products?select=id,title,price,rating,stock,images')
}

type PackedRawProducts = { products: RawProduct[] };

async function getProducts(url: string): Promise<Product[]> {
  let products: Product[] = [];

  console.log("Trying to fetch products");

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
      /*products = data.products.map((product: RawProduct) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        rating: product.rating,
        stock: product.stock,
        image: product.images[0],
      }));*/ 
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error('Failed to fetch products');
  }

  return products;
}

/*function getProducts2(url: string) {
    const { data, error: errorConst, isLoading } = useSWR<PackedRawProducts>(url, fetcher);
    var error = errorConst;
    console.log(data);

    let products: Product[] = [];

    if (data && data.products) {
      
      
      products = data.products.map((product: RawProduct) => ({      
        id: product.id,
        title: product.title,
        price: product.price,
        rating: product.rating,
        stock: product.stock,
        image: product.images[0],
      }));
    }

    return {
      products,
      isLoading,
      isError: Boolean(error)
    }
  }*/

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

/*export function useSingleProduct(id: number) {
  console.log("Trying to fetch product with id: " + id);
  const { data, error: errorConst, isLoading } = useSWR<DetailedProduct>('https://dummyjson.com/products/' + id 
    + `?select=id,title,description,category,price,rating,stock,tags,brand,sku,weight,dimensions,
    warrantyInformation,shippingInformation,reviews,returnPolicy,images`, fetcher);
  var error = errorConst;
  console.log("Single product:", data);

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
  }

  return {
    product,
    isLoading,
    isError: Boolean(error)
  }
}*/
