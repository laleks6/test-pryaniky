import {
  Backdrop,
  Button,
  createTheme,
  Fade,
  FormGroup,
  FormHelperText,
  Modal,
  ThemeProvider,
  Typography,
} from '@mui/material';

import { useState } from 'react';
import PasswordInput from '../input/PasswordInput';
import styles from './style.module.scss';
import NameInput from '../input/nameInput';
import { purple } from '@mui/material/colors';

type Props = {
  handlePostUser(e: React.ChangeEvent<HTMLInputElement>): Promise<void>;
};

function SignIn({ handlePostUser }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePostData = (e) => {
    console.log('click post btn');
    handlePostUser(e);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ede7f6',
      },
      secondary: purple,
    },
  });
  const themeInput = createTheme({
    palette: {
      primary: {
        main: '#ede7f6',
      },
      secondary: purple,
    },
  });

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
            <ThemeProvider theme={themeInput}>
              <NameInput />
              <PasswordInput />
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handlePostData(e)}
                sx={{ color: '#7e57c2' }}
              >
                Sign in
              </Button>
            </ThemeProvider>
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
