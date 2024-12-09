type ServiceInitializer<T> = () => T;

class ServiceContainer {
  private static services: Map<string, any> = new Map();

  public static getService<T>(key: string, initializer: ServiceInitializer<T>): T {
    if (!this.services.has(key)) {
      const serviceInstance = initializer();
      this.services.set(key, serviceInstance);
    }
    return this.services.get(key);
  }

  public static resetService(key: string): void {
    if (this.services.has(key)) {
      this.services.delete(key);
    }
  }
}

export default ServiceContainer;
