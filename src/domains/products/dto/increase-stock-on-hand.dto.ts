export class IncreaseStockOnHandDto {
  items: {
    sku: string // ObjectId
    quantity: number
  }[]
}
