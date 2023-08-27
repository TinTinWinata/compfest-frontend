import { IFormQuestion } from '../interfaces/form-question';

export const STROKE_QUESTIONS: IFormQuestion[] = [
  {
    questionValue: 'age',
    question: 'Berapa umur Anda?',
    answer: ['20 -100'],
    answerValue: [],
  },
  {
    questionValue: 'gender',
    question: 'Apa jenis kelamin Anda?',
    answer: ['Laki - Laki', 'Perempuan', 'Lainnya'],
    answerValue: [0, 1, 2],
  },
  {
    questionValue: 'hypertension',
    question: 'Apa anda pernah mengalami hipertensi?',
    answer: ['Pernah', 'Tidak Pernah'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'heart_disease',
    question: 'Apa anda pernah mengalami penyakit hati?',
    answer: ['Pernah', 'Tidak Pernah'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'ever_married',
    question: 'Apa anda pernah menikah minimal sekali dalam hidup anda?',
    answer: ['Pernah', 'Tidak Pernah'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'work_type',
    question: 'Apa tipe pekerjaan anda?',
    answer: [
      'Saya seorang pelajar',
      'Saya bekerja di pemerintahan',
      'Saya tidak pernah bekerja',
      'Saya tidak bisa mengatakan (privasi)',
      'Saya adalah seorang wiraswasta (pekerja mandiri)',
    ],
    answerValue: [0, 1, 2, 3, 4],
  },
  {
    questionValue: 'residence_type',
    question: 'Apa tipe lingkungan perumahan tempat anda tinggal saat ini?',
    answer: ['Pedesaan', 'Perkotaan'],
    answerValue: [0, 1],
  },
  {
    questionValue: 'avg_glucose_level',
    question: 'Berapakah kadar glukosa rata-rata dalam darah?',
    answer: ['55 - 270'],
    answerValue: [],
  },
  {
    questionValue: 'bmi',
    question: 'Berapakah BMI (Body Mass Index) anda?',
    answer: ['10 - 97'],
    answerValue: [],
  },
  {
    questionValue: 'smoking_status',
    question: 'Apakah anda pernah merokok?',
    answer: [
      'Saya adalah perokok',
      'Saya dulu pernah merokok',
      'Saya tidak pernah merokok',
      'Saya tidak tahu',
    ],
    answerValue: [1, 3, 2, 0],
  },
];
