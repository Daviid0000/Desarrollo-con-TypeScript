export interface Observer {
    update(eventType: string, data: any): void;
}
