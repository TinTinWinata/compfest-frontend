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

export interface IDisease {
  cardiovaskular: IFormsProps;
  diabetes: IFormsProps;
  mental: IFormsProps;
  stroke: IFormsProps;
  diabetesAnn: IFormsProps;
  cardiovaskularAnn: IFormsProps;
  mentalAnn: IFormsProps;
  strokeAnn: IFormsProps;
}

export const DISEASE_LIST: IDisease = {
  cardiovaskular: {
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: CARDIOVASKULAR_QUESTIONS,
    name: 'Cardiovaskular',
  },
  diabetes: {
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: DIABETES_QUESTIONS,
    name: 'Diabetes',
  },
  diabetesAnn: {
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: DIABETES_QUESTIONS,
    name: 'Diabetes ANN',
  },
  cardiovaskularAnn: {
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: CARDIOVASKULAR_QUESTIONS,
    name: 'Cardiovaskular ANN',
  },
  mental: {
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: MENTAL_QUESTIONS,
    name: 'Mental Health',
  },
  mentalAnn: {
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: MENTAL_QUESTIONS,
    name: 'Mental Health ANN',
  },
  stroke: {
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: STROKE_QUESTIONS,
    name: 'Stroke',
  },
  strokeAnn: {
    endpoint: ENDPOINT_LIST.ai.cardiovaskular,
    forms: STROKE_QUESTIONS,
    name: 'Stroke ANN',
  },
};
