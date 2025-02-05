
  export type RawProduct = {
    id: number;
    title: string;
    price: number;
    rating: number;
    stock: number;
    images: string[];
  };
  
  export type Product = {
    id: number;
    title: string;
    price: number;
    rating: number;
    stock: number;
    image: string;
  };

  export type DetailedProduct = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
      width: number;
      height: number;
      depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    reviews: Review[];  // Array of Review objects
    returnPolicy: string;
    images: string[];
  };

  export type Review = {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  };
  