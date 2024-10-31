import { Observer } from "../Interfaces/Observer.interface.js";

export class ProductAuditLogger implements Observer {
    update(eventType: string, data: any): void {
        console.log(`Auditoría: Evento '${eventType}' en producto con datos:`, data);
        // Registrar en una base de datos o archivo de auditoría
    }
}
