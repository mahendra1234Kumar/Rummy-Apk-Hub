export interface Game {
  id: string;
  slug: string;
  name: string;
  description: string;
  longReview?: string;
  image: string;
  downloadUrl: string;
  rating: number;
  bonus?: string;
  downloads?: string;
  minWithdrawal?: string;
  latestVersion?: string;
  appSize?: string;
  lastUpdated?: string;
  withdrawalTime?: string;
  howToDownload?: string;
  howToRegister?: string;
  withdrawalProcess?: string;
  safetyNote?: string;
  features?: string[];
  pros?: string[];
  cons?: string[];
  paymentMethods?: string[];
  faq?: {
    question: string;
    answer: string;
  }[];
  isHot: boolean;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

