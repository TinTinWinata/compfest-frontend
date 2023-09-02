import { IFormQuestion } from '../interfaces/form-question';

export const MENTAL_QUESTIONS: IFormQuestion[] = [
  {
    questionValue: 'Age',
    question: 'Berapakah umur anda?',
    answer: ['10 - 100'],
    answerValue: [],
  },
  {
    questionValue: 'Gender',
    question: 'Apakah jenis kelamin anda?',
    answer: ['Laki - Laki', 'Perempuan'],
    answerValue: [0, 1],
  },
  {
    questionValue: 'self_employed',
    question: 'Apakah anda seorang pekerja mandiri (Wiraswasta)?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'family_history',
    question: 'Apakah Anda memiliki riwayat keluarga dengan penyakit mental?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'work_interfere',
    question:
      'Jika Anda memiliki kondisi kesehatan mental, apakah Anda merasa hal itu mengganggu pekerjaan Anda?',
    answer: ['Sering', 'Kadang - Kadang', 'Jarang', 'Tidak Pernah'],
    answerValue: [1, 2, 3, 0],
  },
  {
    questionValue: 'remote_work',
    question:
      'Apakah Anda bekerja dari jarak jauh (di luar kantor) setidaknya 50% dari waktu Anda?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'tech_company',
    question:
      'Apakah perusahaan Anda merupakan perusahaan/organisasi teknologi?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'benefits',
    question:
      'Apakah pemberi kerja Anda memberikan tunjangan kesehatan mental?',
    answer: ['Ya', 'Tidak', 'Tidak Tahu'],
    answerValue: [1, 0, 2],
  },
  {
    questionValue: 'care_options',
    question:
      'Apakah Anda mengetahui pilihan perawatan kesehatan mental yang disediakan oleh pemberi kerja Anda?',
    answer: ['Ya', 'Tidak', 'Saya Tidak Yakin'],
    answerValue: [1, 0, 2],
  },
  {
    questionValue: 'wellness_program',
    question:
      'Pernahkah atasan Anda membahas kesehatan mental sebagai bagian dari program kesehatan karyawan?',
    answer: ['Ya', 'Tidak', 'Saya Tidak Tahu'],
    answerValue: [1, 0, 2],
  },
  {
    questionValue: 'seek_help',
    question:
      'Apakah pemberi kerja Anda menyediakan sumber daya untuk mempelajari lebih lanjut tentang masalah kesehatan mental dan cara mencari bantuan?',
    answer: ['Ya', 'Tidak', 'Saya Tidak Tahu'],
    answerValue: [1, 0, 2],
  },
  {
    questionValue: 'anonymity',
    question:
      'Apakah anonimitas Anda terlindungi jika Anda memilih untuk memanfaatkan perawatan kesehatan mental atau penyalahgunaan zat',
    answer: ['Ya', 'Tidak', 'Saya Tidak Tahu'],
    answerValue: [1, 0, 2],
  },
  {
    questionValue: 'leave',
    question:
      'Seberapa mudah bagi Anda untuk mengambil cuti medis untuk kondisi kesehatan mental?',
    answer: ['Sangat Mudah', 'Mudah', 'Sulit', 'Sangat Sulit', 'Tidak Tahu'],
    answerValue: [4, 1, 3, 0, 2],
  },
  {
    questionValue: 'mental_health_consequence',
    question:
      'Apakah menurut Anda mendiskusikan masalah kesehatan mental dengan atasan Anda akan berakibat negatif?',
    answer: ['Ya', 'Tidak', 'Mungkin'],
    answerValue: [1, 0, 2],
  },
  {
    questionValue: 'phys_health_consequence',
    question:
      'Apakah menurut Anda mendiskusikan masalah kesehatan fisik dengan atasan Anda akan berakibat negatif?',
    answer: ['Ya', 'Tidak', 'Mungkin'],
    answerValue: [1, 0, 2],
  },
  {
    questionValue: 'coworkers',
    question:
      'Apakah Anda bersedia mendiskusikan masalah kesehatan mental dengan rekan kerja Anda?',
    answer: ['Ya', 'Tidak', 'Hanya Beberapa Orang'],
    answerValue: [1, 0, 2],
  },
  {
    questionValue: 'supervisor',
    question:
      'Apakah Anda bersedia mendiskusikan masalah kesehatan mental dengan atasan langsung Anda?',
    answer: ['Ya', 'Tidak', 'Beberapa Iya'],
    answerValue: [1, 0, 2],
  },
  {
    questionValue: 'mental_health_interview',
    question:
      'Apakah Anda akan mengungkapkan masalah kesehatan mental kepada calon pemberi kerja dalam sebuah wawancara?',
    answer: ['Ya', 'Tidak', 'Mungkin'],
    answerValue: [1, 0, 2],
  },
  {
    questionValue: 'phys_health_interview',
    question:
      'Apakah Anda akan mengungkapkan masalah kesehatan fisik kepada calon pemberi kerja dalam sebuah wawancara?',
    answer: ['Ya', 'Tidak', 'Mungkin'],
    answerValue: [1, 0, 2],
  },
  {
    questionValue: 'mental_vs_physical',
    question:
      'Apakah Anda merasa bahwa atasan Anda menganggap kesehatan mental sama seriusnya dengan kesehatan fisik?',
    answer: ['Ya', 'Tidak', 'Tidak Tahu'],
    answerValue: [1, 0, 2],
  },
  {
    questionValue: 'obs_consequence',
    question:
      'Pernahkah Anda mendengar atau mengamati konsekuensi negatif bagi rekan kerja yang memiliki kondisi kesehatan mental di tempat kerja Anda?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
];
