import {
  Backdrop,
  Button,
  Fade,
  FormGroup,
  FormHelperText,
  Modal,
  Typography,
} from '@mui/material';

import { useState } from 'react';
import PasswordInput from '../input/PasswordInput';
import styles from './style.module.scss';
import NameInput from '../input/nameInput';

type Props = {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  postUser(e: React.ChangeEvent<HTMLInputElement>): Promise<void>;
};

function SignIn({ setUsername, setPassword, postUser }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    // pt: 2,
    // px: 4,
    // pb: 3,
  };

  return (
    <div>
      <Button onClick={handleOpen}>Sign in</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className={styles.modal}
      >
        <Fade in={open}>
          <FormHelperText className={styles.formGroup}>
            <Typography
              className={styles.title}
              id="transition-modal-title"
              variant="h3"
              component="h2"
            >
              Sign in
            </Typography>
            <NameInput />
            <PasswordInput />
            <Button variant="contained" color="">
              Sign in
            </Button>
          </FormHelperText>
        </Fade>
      </Modal>
      {/* <h2>Sign in</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => postUser(e)}>Sign in</button>
      </form> */}
    </div>
  );
}

export default SignIn;
