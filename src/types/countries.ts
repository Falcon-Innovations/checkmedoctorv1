export interface Response<T> {
  data: Array<T>;
}

export interface Country {
  id: number;
  name: string;
  iso2: string;
}

export interface City {
  id: number;
  name: string;
}
