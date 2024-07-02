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

export enum SmokingReason {
  byFriends = "Ikut teman",
  byFamily = "Pengaruh keluarga",
  byStress = "Menghilangkan stres",
  byCuriosity = "Rasa ingin tahu",
  byPeerForce = "Terpaksa oleh teman/lingkungan",
  bySpareTime = "Mengisi waktu luang",
}

export const healthControlTypes = [
  HealthControlType.COMMON,
  HealthControlType.TOOTH,
  HealthControlType.REPRODUCTION,
  HealthControlType.NUTRITION_STATUS,
  HealthControlType.PSYCHOLOGY
]

export const doctors = [
  {
    name: "Ibu Ika dan Sri",
    type: HealthControlType.NUTRITION_STATUS,
    phone: "08123456789"
  },
  {
    name: "dr. Yunisa",
    type: HealthControlType.PSYCHOLOGY,
    phone: "08123456789"
  },
  {
    name: "Ibu Fitri",
    type: HealthControlType.REPRODUCTION,
    phone: "08123456789"
  },
  {
    name: "drg. Derti",
    type: HealthControlType.TOOTH,
    phone: "08123456789"
  },
  {
    name: "dr. Dewi",
    type: HealthControlType.COMMON,
    phone: "08123456789"
  }
]