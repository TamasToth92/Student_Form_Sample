import { AgePipe } from './age.pipe';

describe('AgePipe', () => {
  it('create an instance', () => {
    const pipe = new AgePipe();
    expect(pipe).toBeTruthy();
  });
  it ('should mask old female age', () => {
      const pipe = new AgePipe();
      expect( pipe.transform(45, 'female') ).toBe('40-50');
  });
  it ('should not mask old male age', () => {
      const pipe = new AgePipe();
      expect( pipe.transform(45, 'male') ).toBe('45');
  });
  it ('should not mask young female age', () => {
      const pipe = new AgePipe();
      expect( pipe.transform(25, 'female') ).toBe('25');
  });
  it ('should not mask young male age', () => {
      const pipe = new AgePipe();
      expect( pipe.transform(25, 'male') ).toBe('25');
  });
});
