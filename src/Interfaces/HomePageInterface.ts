import { ProductInterface } from "./ProductInterface";
export interface HomePageInterface {
  readonly category: {
    readonly id: number;
    readonly title: string;
  };
  readonly results: ProductInterface[];
}
