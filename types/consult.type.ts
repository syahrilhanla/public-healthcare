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
  hasSmoke: "YES" | "NO" | null;
  ageStartSmoking: number;
  byFriends: "YES" | "NO" | null;
  byFamily: "YES" | "NO" | null;
  byCuriosity: "YES" | "NO" | null;
  byPeerForce: "YES" | "NO" | null;
  bySpareTime: "YES" | "NO" | null;
  byStress: "YES" | "NO" | null;
  smokingSource: string;
  cigaretteCount: string;
  smokingDuration: string;
  knowledgeOfSmokingEffect: "YES" | "NO" | null;
  wantingToQuit: "YES" | "NO" | null;
  reasonToQuit: string;
  quitSupport: string;
}>;