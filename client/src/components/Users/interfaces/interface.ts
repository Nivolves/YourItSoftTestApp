export interface IRemoveDialogProps {
  email?: string;
  isRemoveDialogOpen: boolean;
  handleCloseDialog: (decision: boolean) => Promise<void>;
}

export interface IUserModalProps {
  errors: {
    [key: string]: string;
  };
  isUserModalOpen: boolean;
  handleClose: () => void;
  handleCreateUser: (
    e: React.FormEvent<HTMLFormElement>,
    email: string
  ) => Promise<void>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  buttonText: "create" | "update";
}
