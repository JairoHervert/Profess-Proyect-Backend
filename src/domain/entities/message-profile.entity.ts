export interface MessageProfileEntity {
  id: number;
  contactName: string;
  contactOccupation: string;
  contactPathProfilePicture?: string;
  contactPhone?: string;
  contactRating?: number;
  sharedFiles?: string[];
}
