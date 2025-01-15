export class ProductBadFieldException extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ProductBadFieldException";
    }
  }
  