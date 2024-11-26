import { Injectable } from '@angular/core';

export abstract class ExpressionComponent {
  abstract evaluate(): number;
  abstract toString(): string;
  abstract toPrettyString(): string;
}

export class NumberLeaf implements ExpressionComponent {
  private readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  evaluate(): number {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }

  toPrettyString(): string {
    return this.toString();
  }
}

export abstract class OperatorComposite implements ExpressionComponent {
  protected children: ExpressionComponent[] = [];

  add(component: ExpressionComponent): void {
    this.children.push(component);
  }

  abstract evaluate(): number;

  abstract toString(): string;

  abstract toPrettyString(): string;

  static combine(operations: OperatorComposite[]): OperatorComposite {
    return operations.slice(1).reduce<OperatorComposite>((acc, op) => {
      acc.add(op);
      return acc;
    }, operations[0]);
  }
}

export class AdditionComposite extends OperatorComposite {
  evaluate(): number {
    return this.children.reduce((sum, child) => sum + child.evaluate(), 0);
  }

  override add(component: NumberLeaf | MultiplicationComposite): void {
    super.add(component);
  }

  toString(pretty = false): string {
    return this.children
      .map((child) => {
        if (pretty) {
          return child.toPrettyString();
        }
        return child.toString();
      })
      .join(' + ');
  }

  toPrettyString(): string {
    return this.toString(true);
  }
}

export class SubtractionComposite extends OperatorComposite {
  evaluate(): number {
    return this.children.reduce((difference, child, index) => {
      if (index === 0) {
        return child.evaluate();
      }

      return difference - child.evaluate();
    }, 0);
  }

  override add(component: NumberLeaf | MultiplicationComposite): void {
    if (
      component instanceof AdditionComposite ||
      component instanceof SubtractionComposite
    ) {
      const parentheses = new ParenthesesComposite();
      parentheses.add(component);
      component = parentheses;
    }
    super.add(component);
  }

  toString(pretty = false): string {
    return this.children
      .map((child, index) => {
        // if the child is a number and it is negative, skip the minus sign
        // and it's not the first child
        if (
          index !== 0 &&
          child instanceof NumberLeaf &&
          child.evaluate() < 0
        ) {
          return pretty
            ? child.toPrettyString().slice(1)
            : child.toString().slice(1);
        }
        return pretty ? child.toPrettyString() : child.toString();
      })
      .join(' - ');
  }

  toPrettyString(): string {
    return this.toString(true);
  }
}

export class MultiplicationComposite extends OperatorComposite {
  evaluate(): number {
    return this.children.reduce(
      (product, child) => product * child.evaluate(),
      1,
    );
  }

  override add(component: NumberLeaf | ParenthesesComposite): void {
    if (
      component instanceof AdditionComposite ||
      component instanceof SubtractionComposite
    ) {
      const parentheses = new ParenthesesComposite();
      parentheses.add(component);
      component = parentheses;
    }
    super.add(component);
  }

  toString(pretty = false): string {
    return this.children
      .map((child) => {
        if (pretty) {
          return child.toPrettyString();
        }
        return child.toString();
      })
      .join(' * ');
  }

  toPrettyString(): string {
    return this.toString(true).replace(/\* /g, ' × ');
  }
}

export class DivisionComposite extends OperatorComposite {
  evaluate(): number {
    return this.children.reduce((product, child, currentIndex) => {
      if (currentIndex === 0) {
        return child.evaluate();
      }
      return product / child.evaluate();
    }, 0);
  }

  override add(component: NumberLeaf | ParenthesesComposite): void {
    if (
      component instanceof AdditionComposite ||
      component instanceof SubtractionComposite
    ) {
      const parentheses = new ParenthesesComposite();
      parentheses.add(component);
      component = parentheses;
    }
    super.add(component);
  }

  toString(pretty = false): string {
    return this.children
      .map((child) => {
        if (pretty) {
          return child.toPrettyString();
        }
        return child.toString();
      })
      .join(' / ');
  }

  toPrettyString(): string {
    return this.toString(true).replace(/\/ /g, ' ÷ ');
  }
}

export class ParenthesesComposite extends OperatorComposite {
  evaluate(): number {
    return this.children.length > 0 ? this.children[0].evaluate() : 0;
  }

  toString(pretty = false): string {
    if (this.children.length === 1 && this.children[0] instanceof NumberLeaf) {
      return this.children[0].toString();
    }
    return `(${this.children
      .map((child) => {
        return pretty ? child.toPrettyString() : child.toString();
      })
      .join(' ')})`;
  }

  toPrettyString(): string {
    return this.toString(true);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ExpressionBuilder {
  num(value: number): NumberLeaf {
    return new NumberLeaf(value);
  }
  sum(...values: (NumberLeaf | MultiplicationComposite)[]): AdditionComposite {
    const addition = new AdditionComposite();
    values.forEach((value) => addition.add(value));
    return addition;
  }

  sumNum(...values: number[]): AdditionComposite {
    return this.sum(...values.map((value) => new NumberLeaf(value)));
  }

  sub(
    ...values: (NumberLeaf | ParenthesesComposite | MultiplicationComposite)[]
  ): SubtractionComposite {
    const subtraction = new SubtractionComposite();
    values.forEach((value) => {
      subtraction.add(value);
    });
    return subtraction;
  }

  subNum(...values: number[]): SubtractionComposite {
    return this.sub(...values.map((value) => new NumberLeaf(value)));
  }

  mulNum(...values: number[]): MultiplicationComposite {
    return this.mul(...values.map((value) => new NumberLeaf(value)));
  }

  mul(
    ...values: (NumberLeaf | ParenthesesComposite | MultiplicationComposite)[]
  ): MultiplicationComposite {
    const multiplication = new MultiplicationComposite();
    values.forEach((value) => {
      multiplication.add(value);
    });
    return multiplication;
  }

  div(
    ...values: (NumberLeaf | ParenthesesComposite | MultiplicationComposite)[]
  ): DivisionComposite {
    const division = new DivisionComposite();
    values.forEach((value) => {
      division.add(value);
    });
    return division;
  }

  divNum(...values: number[]): DivisionComposite {
    return this.div(...values.map((value) => new NumberLeaf(value)));
  }

  parentheses(component: ExpressionComponent): ParenthesesComposite {
    const parentheses = new ParenthesesComposite();
    parentheses.add(component);
    return parentheses;
  }
}

@Injectable({
  providedIn: 'root',
})
export class RandomOperationBuilder {
  private readonly builder = new ExpressionBuilder();

  generate(): ExpressionComponent {
    return this.builder.mul(this.builder.num(2), this.builder.num(3));
  }
}
