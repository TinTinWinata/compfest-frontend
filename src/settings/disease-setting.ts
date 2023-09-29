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
    name: 'Cardiovascular',
  },
  {
    link: '/diabetes',
    endpoint: ENDPOINT_LIST.ai.diabetes,
    forms: DIABETES_QUESTIONS,
    name: 'Diabetes',
  },
  {
    link: '/mental-health',
    endpoint: ENDPOINT_LIST.ai.mental,
    forms: MENTAL_QUESTIONS,
    name: 'Mental Health',
  },
  {
    link: '/stroke',
    endpoint: ENDPOINT_LIST.ai.stroke,
    forms: STROKE_QUESTIONS,
    name: 'Stroke',
  },
  {
    link: '/diabetes-ann',
    endpoint: ENDPOINT_LIST.ai.diabetesAnn,
    forms: DIABETES_QUESTIONS,
    name: 'Diabetes ANN',
  },
  {
    link: '/cardiovaskular-ann',
    endpoint: ENDPOINT_LIST.ai.cardiovaskularAnn,
    forms: CARDIOVASKULAR_QUESTIONS,
    name: 'Cardiovascular ANN',
  },

  {
    link: '/mental-health-ann',
    endpoint: ENDPOINT_LIST.ai.mentalAnn,
    forms: MENTAL_QUESTIONS,
    name: 'Mental Health ANN',
  },
  {
    link: '/stroke-ann',
    endpoint: ENDPOINT_LIST.ai.strokeAnn,
    forms: STROKE_QUESTIONS,
    name: 'Stroke ANN',
  },
];
