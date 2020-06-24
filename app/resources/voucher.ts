export enum VoucherType {
  ABSOLUTE = "absolute",
  PERCENTAGE = "percentage",
}

export interface Voucher {
  id: number;
  code: string;
  type: VoucherType;
  value: number;
  is_visible: boolean;
}
