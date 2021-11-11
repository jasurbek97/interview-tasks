import { RegisterInterface } from '../../auth/interfaces/register.interface';

export interface UserInterface extends RegisterInterface {
  id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
