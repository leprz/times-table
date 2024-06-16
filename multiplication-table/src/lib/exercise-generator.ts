import { Injectable } from '@angular/core';

export interface MultiplicationExercise {
  multiplicand: number;
  multiplier: number;
  exercises: MultiplicationExerciseItem[];
}
export interface MultiplicationExerciseItem {
  label: number;
  isCorrect: boolean;
}

@Injectable({providedIn: 'root'})
export class ExerciseGenerator {
  generateExerciseForMultiplicand(multiplicand: number, multiplier: number): MultiplicationExercise {
    const correctAnswer = multiplicand * multiplier;
    const wrongAnswer1 = correctAnswer + Math.floor(Math.random() * 3) + 1;
    const wrongAnswer2 = correctAnswer - Math.floor(Math.random() * 3) - 1;
    const answers = [correctAnswer, wrongAnswer1, wrongAnswer2].sort(() => Math.random() - 0.5);
    return {
      multiplicand,
      multiplier,
      exercises: answers.map((label) => ({label, isCorrect: label === correctAnswer}))
    };
  }

  static getCorrectAnswer(exercise: MultiplicationExercise): MultiplicationExerciseItem {
    const possibleCorrectAnswer = exercise.exercises.find((item) => item.isCorrect);
    if (!possibleCorrectAnswer) {
      throw new Error('Correct answer not found');
    }
    return possibleCorrectAnswer;
  }
}