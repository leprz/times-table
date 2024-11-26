import { ExpressionParserService } from './expression-parser';

describe('expressionParserService', () => {
  const sut = new ExpressionParserService();

  test.skip('should parse (3 + 4) * (2 + 5) = 49', () => {
    // TODO not implemented yet
    const expression = sut.parse('(3 + 4) * (2 + 5)');
    expect(expression.toString()).toEqual('(3 + 4) * (2 + 5)');
    expect(expression.evaluate()).toEqual(49);
  });
});
