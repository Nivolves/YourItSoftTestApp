export type TAdmin = {
  id: number;
  email: string;
};

export type TContext = {
  admin?: TAdmin;
  accessToken?: string;
  handleSetLoginData: ({
    admin,
    accessToken,
    refreshToken,
  }: TLoginData) => void;
  handleLogout: () => void;
};

export type TLoginData = {
  admin: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TUser = {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
