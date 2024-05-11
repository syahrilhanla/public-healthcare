export const posyanduList = [
  "Posyandu Remaja FRESH",
  "Posyandu Remaja Smart Gemilang",
  "Posyandu Remaja Kusuma Jaya",
  "Posyandu Remaja Mandiri Sehat",
]

export enum ConsultType {
  HEALTH_CONTROL = "Kesehatan Remaja",
  BULLYING = "Kekerasan Anak & Bullying",
  STOP_SMOKING = "Upaya Berhenti Merokok",
  PREGNANCY = "Kehamilan dan Ibu Menyusui"
}

export const consultingTypes = [
  ConsultType.HEALTH_CONTROL,
  ConsultType.BULLYING,
  ConsultType.STOP_SMOKING,
  ConsultType.PREGNANCY
]

export enum HealthControlType {
  COMMON = "Kesehatan Umum",
  TOOTH = "Gigi dan Mulut",
  REPRODUCTION = "Reproduksi",
  NUTRITION_STATUS = "Status Gizi",
  PSYCHOLOGY = "Kesehatan Jiwa"
}

export const healthControlTypes = [
  HealthControlType.COMMON,
  HealthControlType.TOOTH,
  HealthControlType.REPRODUCTION,
  HealthControlType.NUTRITION_STATUS,
  HealthControlType.PSYCHOLOGY
]