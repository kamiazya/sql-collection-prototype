// import { Plugin,  } from 'unified';

export interface Spec<M = any> {
  metadata: M;
  name: string;

  schema: {
    input: any;
    output: any;
  };
}
