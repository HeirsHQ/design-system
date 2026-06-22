export interface Holiday {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface HolidayListResponse {
  holidays: Holiday[];
}

export interface CreateHolidayDto {
  name: string;
  startDate: string;
  endDate: string;
}

export interface UpdateHolidayDto {
  name: string;
  startDate: string;
  endDate: string;
}

export interface CreatePublicHolidayDto {
  name: string;
  date: string;
  description?: string;
  isRecurring?: boolean;
  regions?: string[];
}
