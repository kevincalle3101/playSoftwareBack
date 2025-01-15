export class UnauthorizedException extends Error {
    constructor(action: string) {
        super(`No tienes permiso para ${action} este producto`);
    }
}