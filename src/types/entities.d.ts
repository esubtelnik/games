export interface IGame {
  id: number;
  name: string;
  icon: React.ElementType | React.ReactNode;
  description: string;
  color: string;
  route: string;
}