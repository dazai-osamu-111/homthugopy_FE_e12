export interface Feedback {
  id: number;
  trackingCode: string;
  category: string;
  title: string;
  content: string;
  suggestion: string;
  citizenName: string;
  phoneNumber: string;
  status: 'PENDING' | 'PROCESSED';
  createdAt: string;
  adminResponse?: string;
}