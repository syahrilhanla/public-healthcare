import { HealthControlType } from "lib/reusableValues";

export type Consult = {
  userId: string;
  name: string;
  type: HealthControlType;
  updatedAt: string;
  message: string;
  posyandu: string;
}