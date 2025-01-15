export class ProductNotFoundException extends Error {
    constructor() {
      super('No se encontró el producto')
    }
  }
  