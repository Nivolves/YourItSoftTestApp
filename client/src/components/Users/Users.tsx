import { useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import UserModal from "./UserModal";
import RemoveUserDialog from "./RemoveUserDialog";

import context from "../../global/context";

import { TContext, TUser } from "../../global/types";
import Header from "../Header/Header";

const Users: React.FC = () => {
  const { accessToken } = useContext(context) as TContext;

  const [users, setUsers] = useState<TUser[]>();
  const [currentUser, setCurrentUser] = useState<TUser>();
  const [isRemoveDialogOpen, setRemoveDialogOpen] = useState<boolean>(false);
  const [isUserModalOpen, setUserModalOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (accessToken) {
      axios
        .get<TUser[]>("/api/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({ data }) => setUsers(data))
        .catch(console.error);
    }
  }, [accessToken]);

  const handleOpenRemoveDialog = (user: TUser) => {
    setCurrentUser(user);
    setRemoveDialogOpen(true);
  };

  const handleCloseUserModal = () => {
    setUserModalOpen(false);
    setErrors({});
    setEmail("");
    setCurrentUser(undefined);
  };

  const handleOpenUserModal = (user: TUser) => {
    setCurrentUser(user);
    setEmail(user.email);
    setUserModalOpen(true);
  };

  const handleCloseDialog = async (decision: boolean) => {
    if (decision && currentUser) {
      try {
        const { data } = await axios.delete<TUser[]>(
          `/api/users/${currentUser?.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    }
    setCurrentUser(undefined);
    setRemoveDialogOpen(false);
  };

  const handleCreateUser = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string
  ) => {
    e.preventDefault();
    setErrors({});
    try {
      const { data } = await axios.post<TUser[]>(
        "/api/users",
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUsers(data);
      handleCloseUserModal();
    } catch (err) {
      if (err instanceof AxiosError) {
        const { response } = err;
        const errMessageData = response?.data?.message;
        if (errMessageData) {
          const [field, errMessage] = Array.isArray(errMessageData)
            ? errMessageData[0].split(":")
            : errMessageData.split(":");
          if (!errMessage) {
            return setErrors({ ["global"]: field });
          }
          return setErrors({ [field]: errMessage });
        }
        return setErrors({ ["global"]: "Something went wrong" });
      }
    }
  };

  const handleUpdateUser = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string
  ) => {
    e.preventDefault();
    setErrors({});
    try {
      const { data } = await axios.patch<TUser[]>(
        `/api/users/${currentUser?.id}`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUsers(data);
      handleCloseUserModal();
    } catch (err) {
      if (err instanceof AxiosError) {
        const { response } = err;
        const errMessageData = response?.data?.message;
        if (errMessageData) {
          const [field, errMessage] = Array.isArray(errMessageData)
            ? errMessageData[0].split(":")
            : errMessageData.split(":");
          if (!errMessage) {
            return setErrors({ ["global"]: field });
          }
          return setErrors({ [field]: errMessage });
        }
        return setErrors({ ["global"]: "Something went wrong" });
      }
    }
  };

  return (
    <>
      <Header />
      <Box marginTop={10}>
        <RemoveUserDialog
          email={currentUser?.email}
          handleCloseDialog={handleCloseDialog}
          isRemoveDialogOpen={isRemoveDialogOpen}
        />
        <UserModal
          errors={errors}
          handleClose={handleCloseUserModal}
          isUserModalOpen={isUserModalOpen}
          email={email}
          handleCreateUser={currentUser ? handleUpdateUser : handleCreateUser}
          setEmail={setEmail}
          buttonText={currentUser ? "update" : "create"}
        />
        <Button variant="contained" onClick={() => setUserModalOpen(true)}>
          Create User
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Updated at</TableCell>
                <TableCell>Change</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!users &&
                !!users.length &&
                users.map((user) => {
                  const { id, email, createdAt, updatedAt } = user;

                  return (
                    <TableRow
                      key={id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {email}
                      </TableCell>
                      <TableCell>{new Date(createdAt).toUTCString()}</TableCell>
                      <TableCell>{new Date(updatedAt).toUTCString()}</TableCell>
                      <TableCell onClick={() => handleOpenUserModal(user)}>
                        <Button>Change</Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => handleOpenRemoveDialog(user)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Users;
