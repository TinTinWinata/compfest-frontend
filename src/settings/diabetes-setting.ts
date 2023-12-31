import { IFormQuestion } from "../interfaces/form-question";

export const DIABETES_QUESTIONS: IFormQuestion[] = [
  {
    questionValue: 'HighBP',
    question: 'Apakah anda memiliki atau di diagnosa tekanan darah tinggi ?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'HighChol',
    question: 'Apakah anda memiliki kolestrol ?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'CholCheck',
    question:
      'Apakah anda pernah melakukan pemeriksaan kolesterol dalam 5 tahun terakhir ?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'BMI',
    question: 'Bagaimana kategori BMI Anda ?',
    answer: ['ex. 27'],
    answerValue: [],
  },
  {
    questionValue: 'Smoker',
    question:
      'Apakah anda pernah setidaknya merokok 100 batang dalam seumur hidup anda ?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'Stroke',
    question: 'Apakah anda pernah mengalami stroke ?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'HeartDiseaseorAttack',
    question:
      'Apakah anda pernah mempunyai penyakit jantung koroner atau infark miokard ?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'PhysActivity',
    question:
      'Apakah anda melakukan aktivitas fisik selama 30 hari ini ? (Tidak termasuk dalam pekerjaan anda)',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'Fruits',
    question: 'Apakah anda memakan buah minimal 1x dalam sehari ?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'Veggies',
    question: 'Apakah anda memakan sayur-sayuran minimal 1x dalam sehari ?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'HvyAlcoholConsump',
    question:
      'Apakah adalah seorang alholik berat ? (laki - laki dewasa >= 14 | perempuan dewasa >= 7)',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'AnyHealthcare',
    question: 'Apakah anda mempunyai asuransi kesehatan ?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'NoDocbcCost',
    question:
      'Apakah ada waktu dalam 12 bulan terakhir ketika Anda perlu ke dokter tetapi tidak bisa karena biaya ?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'GenHlth',
    question:
      'Berapakah anda mengatakan secara umum kesehatan anda dari skala (1 - 5) ?',
    answer: [
      '1 (Sangat Baik)',
      '2 (Baik)',
      '3 (Normal)',
      '4 (Kurang Baik)',
      '5 (Tidak Baik)',
    ],
    answerValue: [1, 2, 3, 4, 5],
  },
  {
    questionValue: 'MentHlth',
    question:
      'Berapa hari Anda merasa memiliki masalah kesehatan mental dalam 30 hari terakhir? ?',
    answer: ['0 - 30'],
    answerValue: [],
  },
  {
    questionValue: 'PhysHlth',
    question:
      'Berapa hari Anda merasa memiliki masalah kesehatan fisik dalam 30 hari terakhir ?',
    answer: ['0 - 30'],
    answerValue: [],
  },
  {
    questionValue: 'DiffWalk',
    question:
      'Apakah Anda mengalami kesulitan serius saat berjalan atau menaiki tangga ?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'Sex',
    question: 'Apakah Anda perempuan atau laki-laki ?',
    answer: ['Laki - Laki', 'Perempuan'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'Age',
    question: 'Berapa kategori usia anda ?',
    answer: [
      'Usia 18 - 24',
      'Usia 25 - 29',
      'Usia 30 - 34',
      'Usia 35 - 39',
      'Usia 40 - 44',
      'Usia 45 - 49',
      'Usia 50 - 54',
      'Usia 55 - 59',
      'Usia 60 - 64',
      'Usia 65 - 69',
      'Usia 70 - 74',
      'Usia 75 - 79',
      'Usia 80 - Lebih Tua',
    ],
    answerValue: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  },
];
