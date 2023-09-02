import { IFormQuestion } from '../interfaces/form-question';

export const CARDIOVASKULAR_QUESTIONS: IFormQuestion[] = [
  {
    questionValue: 'age',
    question: 'Berapa umur Anda?',
    answer: ['10 - 100'],
    answerValue: [],
    getAnswer: (ans?: number) => (ans ? ans * 365 : 0),
  },
  {
    questionValue: 'gender',
    question: 'Apa jenis kelamin Anda?',
    answer: ['Laki - Laki', 'Perempuan'],
    answerValue: [2, 1],
  },
  {
    questionValue: 'height',
    question: 'Berapakah tinggi Anda? (dalam centimeter)',
    answer: ['70 - 200'],
    answerValue: [],
  },
  {
    questionValue: 'weight',
    question: 'Berapakah Berat Anda? (dalam kilogram)',
    answer: ['41 - 200'],
    answerValue: [],
  },
  {
    questionValue: 'ap_hi',
    question: 'Berapakah tekanan darah sistolik Anda?',
    answer: ['20 - 200'],
    answerValue: [],
  },
  {
    questionValue: 'ap_lo',
    question: 'Berapakah tekanan darah diastolik Anda?',
    answer: ['20 - 200'],
    answerValue: [],
  },
  {
    questionValue: 'cholesterol',
    question: 'Bagaimana tingkat kolestrol tubuh Anda?',
    answer: ['Sangat Diatas Normal', 'Diatas Normal', 'Normal'],
    answerValue: [3, 2, 1],
  },
  {
    questionValue: 'gluc',
    question: 'Bagaimana tingkat glukosa dalam tubuh Anda?',
    answer: ['Sangat Diatas Normal', 'Diatas Normal', 'Normal'],
    answerValue: [3, 2, 1],
  },
  {
    questionValue: 'smoke',
    question: 'Menurut anda, apakah anda seorang perokok?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'alco',
    question: 'Menurut anda, apakah anda sering meminum alkohol?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'active',
    question: 'Menurut anda, apakah anda seorang yang aktif berolahraga?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
];
