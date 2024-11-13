import { EquationGeneratorDivision } from './equation-generator-division';
import { EquationGeneratorMultiplication } from './equation-generator-multiplication';
import { EquationGeneratorPort } from './equation-generator.port';

export const equationGeneratorMultiplicationProviders = [
  { provide: EquationGeneratorPort, useClass: EquationGeneratorMultiplication },
];

export const equationGeneratorDivisionProviders = [
  { provide: EquationGeneratorPort, useClass: EquationGeneratorDivision },
];
