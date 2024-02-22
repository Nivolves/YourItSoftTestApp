import { Box, Button, FormHelperText, Modal, TextField } from "@mui/material";

import { IUserModalProps } from "./interfaces/interface";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CreateModal: React.FC<IUserModalProps> = ({
  errors,
  isUserModalOpen,
  handleClose,
  handleCreateUser,
  email,
  setEmail,
  buttonText,
}) => (
  <Modal
    open={isUserModalOpen}
    onClose={() => handleClose()}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box
      sx={style}
      component="form"
      onSubmit={(e) => handleCreateUser(e, email)}
    >
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        error={!!errors["email"]}
        FormHelperTextProps={{
          style: { marginLeft: 0 },
        }}
        helperText={errors["email"]}
        name="email"
        autoComplete="email"
        autoFocus
      />
      {!!errors["global"] && (
        <FormHelperText error>{errors["global"]}</FormHelperText>
      )}
      <Button
        style={{ textTransform: "capitalize" }}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {buttonText} User
      </Button>
    </Box>
  </Modal>
);

export default CreateModal;
