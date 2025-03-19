export class MockRouter {

  constructor() { }

  navigate(commands: any[], extras?: any): Promise<boolean> {
    console.log(`Mock navigate to ${commands}`);
    return Promise.resolve(true); // Simulating a successful navigation
  }
}
