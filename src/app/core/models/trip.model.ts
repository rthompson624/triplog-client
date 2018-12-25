export interface Trip {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: number;
  creatorId: number;
  name: string;
  startDate?: string;
  endDate?: string;
}
