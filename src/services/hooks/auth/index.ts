export * from "./useLogin";
export interface IBase {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  updateBy: string | null;
  deleteBy: string | null;
  createdBy: string | null;
  createdByName: string | null;
  isDelete: boolean;
}
