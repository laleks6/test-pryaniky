import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import style from './style.module.css';
import { Data } from '../../types';

function AccessibleTable({ data }: Data[]) {
  console.log('DATA TABLE', data);
  const tableHeads = [
    'Document name',
    'Document type',
    'Document status',
    'Company signature name',
    'Company sig date',
    'Employee signature name',
    'Employee number',
    'Employee sig date',
    'Action',
  ];

  function transformationDate(isoDate: string): string {
    const [yyyy, mm, dd, hh, mi, sc] = isoDate
      .slice(0, isoDate.lastIndexOf('.'))
      .split(/[/:\-T\-Z]/);

    console.log(`${dd}-${mm}-${yyyy} ${hh}:${mi}:${sc}`);

    return `${dd}-${mm}-${yyyy} ${hh}:${mi}:${sc}`;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeads.map((el, i) => (
              <TableCell
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: `${i === 8 && 'red'}`,
                }}
              >
                {el}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Data) => (
            <TableRow key={row.id}>
              <TableCell>{row.documentName}</TableCell>
              <TableCell>{row.documentType}</TableCell>
              <TableCell>{row.documentStatus}</TableCell>
              <TableCell>{row.companySignatureName}</TableCell>
              <TableCell>{transformationDate(row.companySigDate)}</TableCell>
              <TableCell>{row.employeeSignatureName}</TableCell>
              <TableCell>{row.employeeNumber}</TableCell>
              <TableCell>{transformationDate(row.employeeSigDate)}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex' }}>
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      sx={{
                        color: 'black',
                      }}
                    />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <CreateIcon
                      sx={{
                        color: 'black',
                      }}
                    />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AccessibleTable;
