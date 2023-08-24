export interface ITest {
  name: string;
  answers: any;
  result: number;
}

export interface IUserFirestore {
  tests: ITest[];
}
