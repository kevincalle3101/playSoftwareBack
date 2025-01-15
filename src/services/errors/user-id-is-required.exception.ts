export class UserIdIsRequiredException extends Error {
    constructor(action: string) {
        super(`No se proporcionó un usuario para ${action} este producto`);
    }
  }
