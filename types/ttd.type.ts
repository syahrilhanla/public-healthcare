type MonthlyStatus = {
  july: boolean | null | undefined;
  march: boolean | null | undefined;
  september: boolean | null | undefined;
  april: boolean | null | undefined;
  january: boolean | null | undefined;
  december: boolean | null | undefined;
  june: boolean | null | undefined;
  october: boolean | null | undefined;
  august: boolean | null | undefined;
  november: boolean | null | undefined;
  february: boolean | null | undefined;
  may: boolean;
};

export type TtdType = {
  updatedAt: string;
  year: string;
  ttdId: string;
  records: {
    year: string;
    monthlyRecord: MonthlyStatus;
  }[];
  nik: string;
  name: string;
  posyandu: string;
};