import {ProductInterface} from "./ProductInterface";

export interface DataInterface {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly category: {
    readonly title: string | undefined;
  }
  readonly results: ProductInterface[];
}