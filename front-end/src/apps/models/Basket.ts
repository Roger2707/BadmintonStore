import { Brand } from "./Brand"
import { Category } from "./Category"

export interface Basket {
    id: number
    buyerId: string
    items: BasketItem[]
}

export interface BasketItem {
    productId: number
    name: string
    description: string
    price: number
    quantity: number
    created: string
    pictureUrl: string
    status: boolean
    categoryId: number
    category: Category
    brandId: number
    brand: Brand
}