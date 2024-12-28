import { categoryType } from './category'

export type bookType = {
  id: string
  title: string
  description: string
  price: number
  amount: number
  image: string
  categories_id: string
  categories: categoryType
  created_at: Date
  updatede_at: Date
}
