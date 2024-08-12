export class TestStep {
    constructor() {
      this.steps = [];
    }
  
    async log(step, description) {
      try {
        const resolvedStep = await Promise.resolve(step);
        const status = 'PASSED';
        this.steps.push(`${description} - ${status}`);
        return resolvedStep;
      } catch (error) {
        const status = 'FAILED';
        this.steps.push(`${description} - ${status}`);
        throw error;
      }
    }
  
    getSteps() {
      return this.steps;
    }
  }