import { HealthControlType } from "lib/reusableValues";
import { UseFormReturn } from "react-hook-form";

export type Consult = {
  consultId: string;
  userId: string;
  name: string;
  type?: HealthControlType;
  updatedAt: string;
  message: string;
  posyandu: string;
}

export type ConsultFormType = UseFormReturn<{
  userId: string;
  name: string;
  posyandu: string;
  consultId: string;
  type: string;
  consultType: string;
  message: string;
  hasSmoke: boolean;
  ageStartSmoking: number;
  byFriends: boolean;
  byFamily: boolean;
  byCuriosity: boolean;
  byPeerForce: boolean;
  bySpareTime: boolean;
  byStress: boolean;
  smokingSource: string;
  cigaretteCount: number;
  smokingDuration: string;
  knowledgeOfSmokingEffect: boolean;
  wantingToQuit: boolean;
  reasonToQuit: string;
  quitSupport: string;
}>;