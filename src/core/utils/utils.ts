import { ValidationError } from 'class-validator'
import { customAlphabet } from 'nanoid'
import crypto from 'crypto'

export const extractErrorMessageFromDto = (errors: ValidationError[]): string[] => {
  const messages: string[] = []

  errors.forEach((error) => {
    if (error.constraints) {
      messages.push(...Object.values(error.constraints))
    }
    if (error.children && error.children.length > 0) {
      messages.push(...extractErrorMessageFromDto(error.children))
    }
  })
  return messages
}

export const createMediaUrl = ({
  baseUrl,
  filename,
  folderName = 'tmp'
}: {
  baseUrl: string
  folderName?: string
  filename: string
}) => {
  return `${baseUrl}/public/${folderName}/${filename}`
}

export const generateOrderCode = () => {
  const nanoid = customAlphabet('0123456789', 6)()
  return `ORD${nanoid}`
}

export const generateCustomerCode = () => {
  const nanoid = customAlphabet('0123456789', 6)()
  return `CUS${nanoid}`
}

export const generateSkuCode = ({
  brand,
  attributeValues,
  productId
}: {
  brand: string
  attributeValues: string[]
  productId: string
}) => {
  const uniqueString = `${attributeValues.join('-')}-${productId}`
  const hash = crypto.createHash('md5').update(uniqueString).digest('hex').slice(0, 8)
  return `${brand.toUpperCase()}-${hash}`
}
