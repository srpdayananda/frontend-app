export interface IUserPermission {
  id: number;
  name: string;
  description: string;
  sortOrder: number;
  hasPermission?: boolean;
}
