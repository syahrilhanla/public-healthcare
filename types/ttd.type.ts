type MonthlyStatus = {
  july: boolean;
  march: boolean;
  september: boolean;
  april: boolean;
  january: boolean;
  december: boolean;
  june: boolean;
  october: boolean;
  august: boolean;
  november: boolean;
  february: boolean;
  may: boolean;
};

export type TtdType = {
  updatedAt: string;
  year: string;
  ttdId: string;
  monthlyStatus: MonthlyStatus;
  nik: string;
  name: string;
  posyandu: string;
};