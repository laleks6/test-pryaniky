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

import style from './style.module.scss';
import { useContext } from 'react';
import { IsValidNameContext, SetNameContext } from '../../context/Context';

function NameInput() {
  const setName = useContext(SetNameContext);
  const isValidation = useContext(IsValidNameContext) as boolean;

  const handlSetName = (e) => {
    setName((e.target as HTMLInputElement).value);
  };
  return (
    <FormControl
      className={style.formControl}
      onChange={(e) => setName((e.target as HTMLInputElement).value)}
      color="primary"
      error={!isValidation}
    >
      <InputLabel htmlFor="component-outlined">Name</InputLabel>
      <OutlinedInput
        className={style.outlinedInput}
        id="component-outlined"
        label="Name"
        sx={{ color: '#ede7f6' }}
      />
      {!isValidation && (
        <FormHelperText>Name must be formed "user12"</FormHelperText>
      )}
    </FormControl>
  );
}

export default NameInput;
