export interface Product {
  id: number;
  product_name: string;
  product_description: string;
  uploaderId: string;
  brandId: number;
  categoryId: number;
  product_image: string;
  price: number;
  salePrice?: number;
  onSale: boolean;
  discount?: number;
  in_bundle: boolean;
  in_cart: boolean;
}
