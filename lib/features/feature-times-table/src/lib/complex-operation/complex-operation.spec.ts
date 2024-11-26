import {
  AdditionComposite,
  ExpressionBuilder,
  MultiplicationComposite,
  NumberLeaf,
  ParenthesesComposite,
} from './complex-operation';

describe('Complex operation', () => {
  const eb = new ExpressionBuilder();

  it('should calculate (3 + 4) * (2 + 5)', () => {
    const addition1 = new AdditionComposite();
    addition1.add(new NumberLeaf(3));
    addition1.add(new NumberLeaf(4));

    const addition2 = new AdditionComposite();
    addition2.add(new NumberLeaf(2));
    addition2.add(new NumberLeaf(5));

    // (3 + 4)
    const parenthesesComposite1 = new ParenthesesComposite();
    parenthesesComposite1.add(addition1);

    // (2 + 5)
    const parenthesesComposite2 = new ParenthesesComposite();
    parenthesesComposite2.add(addition2);

    const multiplication = new MultiplicationComposite();
    multiplication.add(parenthesesComposite1);
    multiplication.add(parenthesesComposite2);

    expect(multiplication.toString()).toEqual('(3 + 4) * (2 + 5)');
    expect(multiplication.evaluate()).toEqual((3 + 4) * (2 + 5));
  });

  it('should calculate 3 + 4 * 3 = 15', () => {
    const addition = new AdditionComposite();
    addition.add(new NumberLeaf(3));
    const multiplication = new MultiplicationComposite();
    multiplication.add(new NumberLeaf(4));
    multiplication.add(new NumberLeaf(3));
    addition.add(multiplication);

    expect(addition.evaluate()).toBe(3 + 4 * 3);
  });

  it('should calculate 3 + 4 * 3 = 15 using expression builder', () => {
    const expression = eb.sum(eb.num(3), eb.mulNum(4, 3));
    expect(expression.toString()).toBe('3 + 4 * 3');
    expect(expression.evaluate()).toBe(3 + 4 * 3);
  });

  it('should calculate 4 * 3 + 3 = 15 using expression builder', () => {
    const expression = eb.sum(eb.mulNum(4, 3), eb.num(3));
    expect(expression.toString()).toBe('4 * 3 + 3');
    expect(expression.evaluate()).toBe(4 * 3 + 3);
  });

  it('should calculate 4 * (3 + 3) = 24 using expression builder', () => {
    const expression = eb.mul(eb.num(4), eb.parentheses(eb.sumNum(3, 3)));
    expect(expression.toString()).toBe('4 * (3 + 3)');
    expect(expression.evaluate()).toBe(4 * (3 + 3));
  });

  it('should calculate (3 + 4) * (2 + 5) + 2 using expression builder', () => {
    const expression = eb.sum(
      eb.mul(eb.parentheses(eb.sumNum(3, 4)), eb.parentheses(eb.sumNum(2, 5))),
      eb.num(2),
    );
    expect(expression.toString()).toBe('(3 + 4) * (2 + 5) + 2');
    expect(expression.evaluate()).toBe((3 + 4) * (2 + 5) + 2);
  });

  it('should calculate 3 * 3 * 3 * 2 + 2 + 2', () => {
    const expression = eb.sum(eb.mulNum(3, 3, 3, 2), eb.sumNum(2, 2));
    expect(expression.toString()).toBe('3 * 3 * 3 * 2 + 2 + 2');
    expect(expression.evaluate()).toBe(3 * 3 * 3 * 2 + 2 + 2);
  });

  it('should prevent incorrect usage of multiplication with addition', () => {
    const expression = eb.mul(eb.mulNum(3, 3, 3), eb.sumNum(2, 2, 2));
    expect(expression.toString()).toBe('3 * 3 * 3 * (2 + 2 + 2)');
    expect(expression.evaluate()).toBe(3 * 3 * 3 * (2 + 2 + 2));
  });

  it('should prevent incorrect usage of multiplication with subtraction', () => {
    const expression = eb.mul(eb.mulNum(3, 3, 3), eb.subNum(2, 2, 2));
    expect(expression.toString()).toBe('3 * 3 * 3 * (2 - 2 - 2)');
    expect(expression.evaluate()).toBe(3 * 3 * 3 * (2 - 2 - 2));
  });

  it('should prevent incorrect usage of division with addition', () => {
    const expression = eb.div(eb.divNum(4, 2), eb.sumNum(1, 1));
    expect(expression.toString()).toBe('4 / 2 / (1 + 1)');
    expect(expression.evaluate()).toBe(4 / 2 / (1 + 1));
  });

  it('should prevent incorrect usage of division with subtraction', () => {
    const expression = eb.div(eb.divNum(3, 3, 3), eb.subNum(2, 2, 2));
    expect(expression.toString()).toBe('3 / 3 / 3 / (2 - 2 - 2)');
    expect(expression.evaluate()).toBe(3 / 3 / 3 / (2 - 2 - 2));
  });

  it('should skip minus sign when value is already negative', () => {
    const expression = eb.subNum(-2, 2);
    expect(expression.toString()).toBe('-2 - 2');
    expect(expression.evaluate()).toBe(-2 - 2);
  });

  it('should subtract correctly when the first value is not negative', () => {
    const expression = eb.subNum(2, 2);
    expect(expression.toString()).toBe('2 - 2');
    expect(expression.evaluate()).toBe(2 - 2);
  });

  it('should subtract correctly when result of the multiplication is negative', () => {
    const expression = eb.sub(eb.num(2), eb.mulNum(3, -3));
    expect(expression.toString()).toBe('2 - 3 * -3');
    expect(expression.evaluate()).toBe(2 - 3 * -3);
  });

  // TODO implement optimizing the tree
  // it('should not use parentheses on single number', () => {
  //   const expression = eb.mul(eb.mulNum(3,3,3), eb.sumNum(2));
  //   expect(expression.toString()).toBe('3 * 3 * 3 * 2');
  //   expect(expression.evaluate()).toBe(3 * 3 * 3 * 2);
  // });

  it('should not use single number parentheses', () => {
    const expression = eb.parentheses(eb.num(3));
    expect(expression.toString()).toBe('3');
  });
});
