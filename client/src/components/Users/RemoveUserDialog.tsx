import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

import { IRemoveDialogProps } from "./interfaces/interface";

const RemoveUserDialog: React.FC<IRemoveDialogProps> = ({
  isRemoveDialogOpen,
  handleCloseDialog,
  email,
}) => {
  return (
    <Dialog
      open={isRemoveDialogOpen}
      onClose={() => handleCloseDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to remove {email || ""}?
      </DialogTitle>
      <DialogActions>
        <Button
          color="error"
          variant="contained"
          onClick={() => handleCloseDialog(true)}
        >
          Remove
        </Button>
        <Button onClick={() => handleCloseDialog(false)} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveUserDialog;
