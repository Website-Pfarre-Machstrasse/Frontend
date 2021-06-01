
describe('String', () => {
  describe('String.format', () => {
    describe('Number Pattern', () => {
      describe('Placeholders', () => {
        it('should return template if no format is found', () => {
          const template = 'Bar';
          const valueToInsert = 'Foo';
          const result = String.format(template, valueToInsert);
          expect(result).toEqual(template);
        });

        it('should format the string correct', () => {
          const template = '{0}';
          const valueToInsert = 'Foo';
          const result = String.format(template, valueToInsert);
          expect(result).toEqual(valueToInsert);
        });

        it('should format the string correct multiple times', () => {
          const template = '{0}Bar{0}';
          const valueToInsert = 'Foo';
          const expectedValue = 'FooBarFoo';
          const result = String.format(template, valueToInsert);
          expect(result).toEqual(expectedValue);
        });

        it('should format the string correct multiple values', () => {
          const template = '{0}Bar{1}';
          const valueToInsert = 'Foo';
          const secondValueToInsert = 'Baz';
          const expectedValue = 'FooBarBaz';
          const result = String.format(template, valueToInsert, secondValueToInsert);
          expect(result).toEqual(expectedValue);
        });
      });
      describe('formatting', () => {
        describe('dates', () => {
          it('should set the correct display date using Date', () => {
            const template = '{0:d}';
            const valueToInsert = new Date(2017, 4, 13);

            const expectedValue = '13.04.2017';
            const result = String.format(template, valueToInsert);
            console.log(result);
            expect(result).toEqual(expectedValue);
          });

          it('should set the correct sortable date using Date', () => {
            const template = '{0:s}';
            const valueToInsert = new Date(2017, 4, 13);

            const expectedValue = '2017-04-13';
            const result = String.format(template, valueToInsert);
            console.log(result);
            expect(result).toEqual(expectedValue);
          });

          it('should set the correct display date using string', () => {
            const template = '{0:d}';
            const valueToInsert = '2017-01-23 00:00';

            const expectedValue = '23.01.2017';
            const result = String.format(template, valueToInsert);
            console.log(result);
            expect(result).toEqual(expectedValue);
          });

          it('should set the correct sortable date using string', () => {
            const template = '{0:s}';
            const valueToInsert = '21.03.2017 22:15:01';

            const expectedValue = '2017-03-21T22:15:01';
            const result = String.format(template, valueToInsert);
            console.log(result);
            expect(result).toEqual(expectedValue);
          });

          it('should set the correct sortable date without time using string', () => {
            const template = '{0:s}';
            const valueToInsert = '21.03.2017';

            const expectedValue = '2017-03-21T00:00:00';
            const result = String.format(template, valueToInsert);
            console.log(result);
            expect(result).toEqual(expectedValue);
          });
        });

        describe('case switching', () => {
          it('should return the string as uppercase', () => {
            const expectedValue = 'AWESOME';
            const template = '{0:U}';
            const valueToInsert = 'awesome';

            const actual = String.format(template, valueToInsert);

            expect(actual).toEqual(expectedValue);
          });

          it('should return the string as lowercase', () => {
            const expectedValue = 'awesome';
            const template = '{0:L}';
            const valueToInsert = 'AWESOME';

            const actual = String.format(template, valueToInsert);

            expect(actual).toEqual(expectedValue);
          });
        });

        describe('numbers', () => {

          it('should not pad without specifier using {0}', () => {
            const template = '{0}';
            const result = String.format(template, 5);
            expect(result).toEqual('5');
          });

          it('should pad 5 to 05 using {0:00}', () => {
            const template = '{0:00}';
            const result = String.format(template, 5);
            expect(result).toEqual('05');
          });

          it('should pad 5 to 005 using {0:000}', () => {
            const template = '{0:000}';
            const result = String.format(template, 5);
            expect(result).toEqual('005');
          });

          it('should ignore padding when input is longer then template', () => {
            const template = '{0:000}';
            const result = String.format(template, 50000);
            expect(result).toEqual('50000');
          });

          it('should set the correct thousands seperator', () => {
            const template = '{0:n}';
            const valueToInsert = '10000000000';
            const expectedValue = '10.000.000.000';

            const result = String.format(template, valueToInsert);

            expect(result).toEqual(expectedValue);
          });
          it('should set the correct thousands seperator keeping the decimals', () => {
            const template = '{0:n}';
            const valueToInsert = '10000000000,12345';
            const expectedValue = '10.000.000.000,12345';

            const result = String.format(template, valueToInsert);

            expect(result).toEqual(expectedValue);
          });
        });

        describe('hexadecimal', () => {
          it('number should be converted to hex lowercase', () => {
            const result = String.format('{0:x}', 500);
            expect(result).toEqual('1f4');
          });

          it('number should be converted to hex uppercase', () => {
            const result = String.format('{0:X}', 500);
            expect(result).toEqual('1F4');
          });

          it('decimal should be converted to hex lowercase', () => {
            const result = String.format('{0:x}', 321.124);
            expect(result).toEqual('141.1fbe76c8b44');
          });

          it('decimal should be converted to hex uppercase', () => {
            const result = String.format('{0:X}', 321.124);
            expect(result).toEqual('141.1FBE76C8B44');
          });

          it('minus decimal should be converted to hex lowercase', () => {
            const result = String.format('{0:x}', -321.124);
            expect(result).toEqual('-141.1fbe76c8b44');
          });

          it('minus decimal should be converted to hex uppercase', () => {
            const result = String.format('{0:X}', -321.124);
            expect(result).toEqual('-141.1FBE76C8B44');
          });
        });
      });
    });
    describe('Text Pattern', () => {
      describe('formatting', () => {
        it('Should parse out the word', () => {
          // Arrange
          const fruit = { type: 'apple', color: 'red' };

          // Act
          const formatted = String.format('the {type} is {color}', fruit);

          // Assert
          expect(formatted).toEqual('the apple is red');
        });

        it('Should parse out the word with specifiers and TS Class', () => {
          class Fruit {
            public type: string;
            public color: string;
            public shippingDate: string | Date;
            public amount: number | string;

            constructor(type: string, color: string, shippingDate: string | Date, amount: number | string) {
              this.type = type;
              this.color = color;
              this.shippingDate = shippingDate;
              this.amount = amount;
            }
          }
          // Arrange
          const fruit: Fruit = new Fruit('apple', 'RED', '31.12.2018 01:02:03', '10000');

          // Act
          const formatted = String.format('the {type:U} is {color:L} shipped on {shippingDate:s} with an amount of {amount:n}', fruit);

          // Assert
          expect(formatted).toEqual('the APPLE is red shipped on 2018-12-31T01:02:03 with an amount of 10.000');
        });
      });
    });
  });
  describe('String.isWhitespaceOrEmpty', () => {
    it('should return true on empty string', () => {
      const teststring = '';
      const result = String.isWhitespaceOrEmpty(teststring);
      expect(result).toEqual(true);
    });

    it('should return true only whitespace', () => {
      const teststring = '    ';
      const result = String.isWhitespaceOrEmpty(teststring);
      expect(result).toEqual(true);
    });

    it('should return false contains non-whitespace characters', () => {
      const teststring = '  s  ';
      const result = String.isWhitespaceOrEmpty(teststring);
      expect(result).toEqual(false);
    });
  });
});
