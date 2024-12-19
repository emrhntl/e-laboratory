export abstract class BaseEntity {
    id: string;

    constructor(id: string) {
        this.id = id;
    }

    toJSON(): Record<string, any> {
        return Object.getOwnPropertyNames(this).reduce((acc, key) => {
            acc[key] = (this as any)[key];
            return acc;
        }, {} as Record<string, any>);
    }
}
