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
import useChangeData from '../../hooks/useChangeData';
import { TokenContext } from '../../context/Context';

type Props = { open: true; handleClose: () => void; id: string };

function EditCreateForm({ open, handleClose, id }: Props) {
  const [docName, setDocName] = useState('');
  const [docType, setDocType] = useState('');
  const [signature, setSignature] = useState('');
  const [companySignature, setCompanySignature] = useState('');
  const [companySigDate, setCompanySigDate] = useState<Dayjs | null>(null);
  const [employeeSigName, setEmployeeSigName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [employeeSigDate, setEmployeeSigDate] = useState<Dayjs | null>(null);

  const token = useContext(TokenContext);

  // console.log(companySigDate);

  const { mutate } = useChangeData();
  const handleChange = () => {
    const companyD = dayjs(companySigDate).format('YYYY-MM-DDTHH:mm:ss.sss[Z]');
    const mployeeD = dayjs(employeeSigDate).format(
      'YYYY-MM-DDTHH:mm:ss.sss[Z]'
    );
    console.log('DATEEE', companyD);
    console.log(mployeeD);
    //2022-11-23T11:19:27.017Z
    const data = {
      companySigDate: companyD,
      companySignatureName: companySignature,
      documentName: docName,
      documentStatus: signature,
      documentType: docType,
      employeeNumber: employeeNumber,
      employeeSigDate: mployeeD,
      employeeSignatureName: employeeSigName,
    };
    mutate({
      data,
      token,
      id,
    });
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
              // helperText="Incorrect entry."
            />
            <TextField
              id="outlined-error-helper-text"
              label="Document type"
              helperText="Incorrect entry."
              value={docType}
              onChange={(e) => setDocType(e.target.value as string)}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Signature</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={signature}
                label="Signature"
                onChange={(e) => setSignature(e.target.value as string)}
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
              // helperText="Incorrect entry."
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
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              id="outlined-error-helper-text"
              label="Employee signature name"
              value={employeeSigName}
              onChange={(e) => setEmployeeSigName(e.target.value as string)}
              // helperText="Incorrect entry."
            />
            <TextField
              id="outlined-error-helper-text"
              label="Employee number"
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value as string)}
              // helperText="Incorrect entry."
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
