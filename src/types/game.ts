export interface Game {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  downloadUrl: string;
  rating: number;
  bonus?: string;
  downloads?: string;
  minWithdrawal?: string;
  isHot: boolean;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

