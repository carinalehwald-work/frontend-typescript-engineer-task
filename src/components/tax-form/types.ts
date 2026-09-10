export type CostType = "equipment" | "training" | "other";

export interface CostItem {
  name: string;
  amount: number;
}

export interface CostConfiguration {
  type: CostType;
  addAction: string;
  nameId: string;
  amountId: string;
  listAttribute: string;
  totalAttribute: string;
}