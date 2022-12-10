export type PostProperties = {
  id: string;
  title: string;
  author: string;
  views: number;
  redirectUrl: string;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
