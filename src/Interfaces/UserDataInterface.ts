export interface UserDataInterface {
  readonly id: number;
  readonly phone: string;
  readonly fullname: string;
  readonly photo: string | undefined;
  readonly metamask_id?: string | undefined;
  readonly birthday: string | null;
  readonly total_refs?: number;
  readonly user: {
    readonly id: number;
    readonly email: string;
    readonly ref_code: string | null;
  };
  readonly gender: string | null;
  readonly gender_text?: string | null;
}