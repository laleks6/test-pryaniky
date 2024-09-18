import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useContext, useState } from 'react';
import style from './style.module.scss';
import dayjs, { Dayjs } from 'dayjs';

import { TokenContext } from '../../context/Context';
import { Data } from '../../types';
import useChangeData from '../../hooks/useChangeData';
import { isValidationEditForm } from '../../helpers/validation';

type Props = {
  data?: Data;
  open: true;
  handleClose: () => void;
  handlMutate: (
    requestData: Data,
    token?: string | undefined,
    id?: string | undefined
  ) => void;
  id?: string;
};

function EditCreateForm({ data, open, handleClose, handlMutate, id }: Props) {
  const [docName, setDocName] = useState(data?.documentName || '');
  const [docType, setDocType] = useState(data?.documentType || '');
  const [signature, setSignature] = useState(data?.documentStatus || '');
  const [companySignature, setCompanySignature] = useState(
    data?.companySignatureName || ''
  );
  const [companySigDate, setCompanySigDate] = useState<Dayjs | null>(
    data?.companySigDate ? dayjs(data?.companySigDate) : null
  );
  const [employeeSigName, setEmployeeSigName] = useState(
    data?.employeeSignatureName || ''
  );
  const [employeeNumber, setEmployeeNumber] = useState(
    data?.employeeNumber || ''
  );
  const [employeeSigDate, setEmployeeSigDate] = useState<Dayjs | null>(
    data?.employeeSigDate ? dayjs(data?.employeeSigDate) : null
  );

  const [isValidaton, setIsValidation] = useState<
    boolean | Record<string, boolean>
  >(false);

  const token = useContext(TokenContext) as string;

  // console.log(companySigDate);

  const handleChange = () => {
    const companyD = dayjs(companySigDate).format('YYYY-MM-DDTHH:mm:ss.sss[Z]');
    const mployeeD = dayjs(employeeSigDate).format(
      'YYYY-MM-DDTHH:mm:ss.sss[Z]'
    );

    //2022-11-23T11:19:27.017Z
    const requestData = {
      companySigDate: companyD,
      companySignatureName: companySignature,
      documentName: docName,
      documentStatus: signature,
      documentType: docType,
      employeeNumber: employeeNumber,
      employeeSigDate: mployeeD,
      employeeSignatureName: employeeSigName,
    };
    console.log('MUTATE 0 ', requestData, token, id);

    if (typeof isValidationEditForm(requestData) !== 'object') {
      console.log('valid');
      handlMutate(requestData, token, id);
    } else {
      console.log('not valid', isValidationEditForm(requestData));
      setIsValidation(isValidationEditForm(requestData));
    }
  };
  return (
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
      className={style.modal}
    >
      <Fade in={open} className={style.form}>
        <form>
          <Typography id="transition-modal-title" variant="h3" component="h2">
            Edit
          </Typography>
          <Box className={style.blockInputs}>
            <TextField
              id="outlined-error-helper-text"
              label="Document name"
              value={docName}
              onChange={(e) => setDocName(e.target.value as string)}
              error={isValidaton && !isValidaton.documentName}
              helperText={isValidaton && 'The field must not be empty'}
            />
            <TextField
              id="outlined-error-helper-text"
              label="Document type"
              value={docType}
              onChange={(e) => setDocType(e.target.value as string)}
              error={isValidaton && !isValidaton.documentType}
              helperText={isValidaton && 'The field must not be empty'}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Signature</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={signature}
                label="Signature"
                onChange={(e) => setSignature(e.target.value as string)}
                error={isValidaton && !isValidaton.documentStatus}
                helperText={isValidaton && 'Select document status'}
              >
                <MenuItem value={'Подписан'}>Подписан</MenuItem>
                <MenuItem value={'Не подписан'}>Не подписан</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-error-helper-text"
              label="Company signature name"
              value={companySignature}
              onChange={(e) => setCompanySignature(e.target.value as string)}
              error={isValidaton && !isValidaton.companySignatureName}
              helperText={isValidaton && 'Select document status'}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['DateTimePicker']}
                sx={{ position: 'relative', top: -8 }}
              >
                <DateTimePicker
                  label="Company sig date"
                  value={companySigDate}
                  onChange={(newValue) => setCompanySigDate(newValue)}
                  slotProps={{
                    textField: {
                      helperText: isValidaton && 'Select date',
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              id="outlined-error-helper-text"
              label="Employee signature name"
              value={employeeSigName}
              onChange={(e) => setEmployeeSigName(e.target.value as string)}
              error={isValidaton && !isValidaton.employeeSignatureName}
              helperText={isValidaton && 'The field must not be empty'}
            />
            <TextField
              id="outlined-error-helper-text"
              label="Employee number"
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value as string)}
              error={isValidaton && !isValidaton.employeeNumber}
              helperText={isValidaton && 'The field must not be empty'}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['DateTimePicker']}
                sx={{ position: 'relative', top: -8 }}
              >
                <DateTimePicker
                  label="Employee sig date"
                  value={employeeSigDate}
                  onChange={(newValue) => setEmployeeSigDate(newValue)}
                  slotProps={{
                    textField: {
                      helperText: isValidaton && 'Select date',
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ color: '#7e57c2' }}
            onClick={() => handleChange()}
          >
            Edit
          </Button>
        </form>
      </Fade>
    </Modal>
  );
}

export default EditCreateForm;
