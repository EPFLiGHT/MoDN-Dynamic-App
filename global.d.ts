type ObjectKeys<T> = T extends Record<string | number, any>
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;

  entriesTypeSafe<T>(o: T): Entries<T>;
}

type HeatmapPredictions = Record<
  string,
  {
    answer: string | null;
    probability: Record<string, number>;
  }
>;

declare module 'react-native-image-to-pdf' {
  function createPDFbyImages(options: {
    imagePaths: string[];
    name: string;
    maxSize?: {width: number; height: number};
    quality?: number;
  }): Promise<{filePath: string}>;

  export default {
    createPDFbyImages,
  };
}
