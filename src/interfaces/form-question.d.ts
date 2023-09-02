export type IFormQuestion = {
  question: string;
  questionValue: string;
  answer: string[];
  answerValue: number[];
  getAnswer?: (num?: number) => number;
};
