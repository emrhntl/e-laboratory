export abstract class BaseEntity {
    public write(): void {
        const className = this.constructor.name;
        const fields = Object.entries(this)
            .map(([key, value]) => `${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`)
            .join(', ');
        console.log(`${className} { ${fields} }`);
    }
}
