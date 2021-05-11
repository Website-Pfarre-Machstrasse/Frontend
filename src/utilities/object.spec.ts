describe('Object', () => {
  describe('Object.clone', () => {
    it('should clone object', () => {
      const object = {test: true, test2: {test:true}};
      const object2 = Object.clone(object);
      expect(object).toEqual(object2);
      expect(object).not.toBe(object2);
      object.test = false;
      expect(object).not.toEqual(object2);
      expect(object).not.toBe(object2);
    });
  });
});
