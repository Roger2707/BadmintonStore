import { Brand } from "./Brand"
import { Category } from "./Category"

export interface Product {
  id: number
  name: string
  description: string
  price: number
  quantityInStock: number
  created: string
  pictureUrl: string
  status: boolean
  categoryId: number
  category: Category
  brandId: number
  brand: Brand
}
