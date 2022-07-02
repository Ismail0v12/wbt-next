interface CategoryInterface {
  readonly id: number;
  readonly title: string;
}

export interface ProductInterface {
  readonly id: number;
  readonly category: CategoryInterface;
  readonly like: { id: number } | null;
  readonly title: string;
  readonly description: string;
  readonly photos: string[];
  readonly link: string;
  readonly sale: number | null;
  readonly views?: number;
  readonly title_2?: string;
}
