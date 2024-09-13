import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useContext, useState } from 'react';
import {
  IsValidPasswordContext,
  SetPasswordContext,
} from '../../context/Context';

function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  const setPassword = useContext(SetPasswordContext);
  const isValidation = useContext(IsValidPasswordContext) as boolean;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    // <FormControl error variant="standard">
    //   <InputLabel htmlFor="input-name">Name</InputLabel>
    //   <Input
    //     id="input-name"
    //     aria-describedby="component-error-text"
    //     type="text"
    //   />
    //   <FormHelperText id="component-error-text">Error</FormHelperText>
    // </FormControl>
    <FormControl
      variant="outlined"
      onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
      error={!isValidation}
    >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
        sx={{ color: '#ede7f6' }}
      />
      {!isValidation && (
        <FormHelperText>Password must be "Password"</FormHelperText>
      )}
    </FormControl>
  );
}

export default PasswordInput;
