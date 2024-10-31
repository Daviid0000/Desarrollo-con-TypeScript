import { Observer } from "../Interfaces/Observer.interface.js";

export class ProductNotifier implements Observer {
    update(eventType: string, data: any): void {
        if (eventType === "create" || eventType === "update") {
            console.log(`Notificación: El producto con ID ${data.id} fue ${eventType}d.`);
            // Enviar notificación a través de un servicio externo
        }
    }
}
