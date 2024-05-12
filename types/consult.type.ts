import { HealthControlType } from "lib/reusableValues";

export type Consult = {
  consultId: string;
  userId: string;
  name: string;
  type?: HealthControlType;
  updatedAt: string;
  message: string;
  posyandu: string;
}