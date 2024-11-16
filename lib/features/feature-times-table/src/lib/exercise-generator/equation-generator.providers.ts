import { EquationGeneratorDivision } from './equation-generator-division';
import { EquationGeneratorMultiplication } from './equation-generator-multiplication';
import { EquationGeneratorPort } from './equation-generator.port';
import { EquationGeneratorSubtraction } from './equation-generator-subtraction';
import { EquationGeneratorAddition } from './equation-generator-addition';

export const equationGeneratorMultiplicationProviders = [
  { provide: EquationGeneratorPort, useClass: EquationGeneratorMultiplication },
];

export const equationGeneratorDivisionProviders = [
  { provide: EquationGeneratorPort, useClass: EquationGeneratorDivision },
];

export const equationGeneratorSubtractionProviders = [
  { provide: EquationGeneratorPort, useClass: EquationGeneratorSubtraction },
];

export const equationGeneratorAdditionProviders = [
  { provide: EquationGeneratorPort, useClass: EquationGeneratorAddition },
];
