export interface ProphetOptions {
  growth: string;
  dfCap: number;
  dfFloor: number;
  ftCap: number;
  ftFloor: number;
  cpScale: number;
  cpList: string[];
  cpThreshold: number;
  periods: number;
  holidays: string;
  holidayScale: number;
  yearlyScale: number | string | boolean;
  weeklyScale: number | string | boolean;
  seasonMode: string;
  seasonScale: number;
}