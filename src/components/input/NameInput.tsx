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

function NameInput() {
  return (
    <FormControl className={style.formControl}>
      <InputLabel htmlFor="component-outlined">Name</InputLabel>
      <OutlinedInput
        className={style.outlinedInput}
        id="component-outlined"
        label="Name"
      />
    </FormControl>
  );
}

export default NameInput;
