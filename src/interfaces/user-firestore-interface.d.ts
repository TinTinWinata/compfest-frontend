import { IResultType } from '../components/form/finish';

export interface ITest {
  name: string;
  answers: IResultType;
  result: number;
}

export interface IUserFirestore {
  tests: ITest[];
}
