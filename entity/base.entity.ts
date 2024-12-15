export abstract class BaseEntity {
    id: string;

    constructor(id: string) {
        this.id = id;
    }

    public toFirestore(): Record<string, any> {
        return Object.fromEntries(
            Object.entries(this).map(([key, value]) => {
                if (Array.isArray(value)) {
                    return [key, value.map(item => item instanceof BaseEntity ? item.toFirestore() : item)];
                }
                if (value instanceof BaseEntity) {
                    return [key, value.toFirestore()];
                }
                return [key, value];
            })
        );
    }

    public static fromFirestore<T>(this: new (...args: any[]) => T, data: any): T {
        const instance = new this(data.id);

        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                (instance as any)[key] = value.map(item => (typeof item === 'object' ? BaseEntity.fromFirestore.call(this, item) : item));
            } else if (typeof value === 'object' && value !== null) {
                (instance as any)[key] = BaseEntity.fromFirestore.call(this, value);
            } else {
                (instance as any)[key] = value;
            }
        });

        return instance;
    }
}
