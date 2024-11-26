import { ExpressionBuilder, ExpressionComponent } from './complex-operation';

export class ExpressionParserService {
  private expressionBuilder = new ExpressionBuilder();

  parse(expression: string): ExpressionComponent {
    const tokens = this.tokenize(expression);
    const parsedExpression = this.parseTokens(tokens);
    return parsedExpression;
  }

  private tokenize(expression: string): string[] {
    return expression.match(/\d+|\+|\*|\(|\)/g) || [];
  }

  private parseTokens(tokens: string[]): ExpressionComponent {
    const stack: (ExpressionComponent | string)[] = [];
    tokens.forEach((token) => {
      if (/\d/.test(token)) {
        stack.push(this.expressionBuilder.num(parseInt(token, 10)));
      } else if (token === '+') {
        stack.push(token);
      } else if (token === '*') {
        stack.push(token);
      } else if (token === '(') {
        stack.push(token);
      } else if (token === ')') {
        const subExpression: ExpressionComponent[] = [];
        while (stack.length > 0) {
          const top = stack.pop();
          if (top === '(') break;
          if (top instanceof ExpressionComponent) {
            subExpression.unshift(top);
          }
        }
        stack.push(
          this.expressionBuilder.parentheses(
            this.buildExpression(subExpression),
          ),
        );
      }
    });
    return this.buildExpression(stack);
  }

  private buildExpression(
    components: (ExpressionComponent | string)[],
  ): ExpressionComponent {
    const additionComponents: ExpressionComponent[] = [];
    let currentMultiplication: ExpressionComponent[] = [];

    components.forEach((component) => {
      if (component instanceof ExpressionComponent) {
        currentMultiplication.push(component);
      } else if (component === '*') {
        // Do nothing, just continue to collect multiplication components
      } else if (component === '+') {
        if (currentMultiplication.length > 0) {
          additionComponents.push(
            this.expressionBuilder.mul(...(currentMultiplication as any)),
          );
          currentMultiplication = [];
        }
      }
    });

    if (currentMultiplication.length > 0) {
      additionComponents.push(
        this.expressionBuilder.mul(...(currentMultiplication as any)),
      );
    }

    return this.expressionBuilder.sum(...(additionComponents as any));
  }
}
