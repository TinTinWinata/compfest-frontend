// <Forms
// name="Diabetes ANN"
// forms={EXAMPLE_QUESTIONS}
// endpoint={ENDPOINT_LIST.ai.diabetesAnn}
// />

import { IFormsProps } from '../components/form/forms';
import { CARDIOVASKULAR_QUESTIONS } from './cardiovaskular-setting';
import { DIABETES_QUESTIONS } from './diabetes-setting';
import { ENDPOINT_LIST } from './endpoint-setting';
import { MENTAL_QUESTIONS } from './mental-setting';
import { STROKE_QUESTIONS } from './stroke-setting';

export interface IDiseaseForm extends IFormsProps {
  link: string;
}

export const DISEASE_LIST: IDiseaseForm[] = [
  {
    link: '/cardiovaskular',
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: CARDIOVASKULAR_QUESTIONS,
    name: 'Cardiovaskular',
  },
  {
    link: '/diabetes',
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: DIABETES_QUESTIONS,
    name: 'Diabetes',
  },
  {
    link: '/diabetes-ann',
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: DIABETES_QUESTIONS,
    name: 'Diabetes ANN',
  },
  {
    link: '/cardiovaskular-ann',
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: CARDIOVASKULAR_QUESTIONS,
    name: 'Cardiovaskular ANN',
  },
  {
    link: '/mental-health',
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: MENTAL_QUESTIONS,
    name: 'Mental Health',
  },
  {
    link: '/mental-ann',
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: MENTAL_QUESTIONS,
    name: 'Mental Health ANN',
  },
  {
    link: '/stroke',
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: STROKE_QUESTIONS,
    name: 'Stroke',
  },
  {
    link: '/stroke-ann',
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: STROKE_QUESTIONS,
    name: 'Stroke ANN',
  },
];
