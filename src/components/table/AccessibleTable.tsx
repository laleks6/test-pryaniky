import {
  Box,
  Button,
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
import { useContext, useState } from 'react';
import EditCreateForm from '../edit__create/EditCreateForm';
import useDeleteData from '../../hooks/useDeleteData';
import { TokenContext } from '../../context/Context';
import AddIcon from '@mui/icons-material/Add';
import useChangeData from '../../hooks/useChangeData';
import useAddData from '../../hooks/useAddData';

function AccessibleTable({ data }: Data[]) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [id, setId] = useState('');
  const [index, setIndex] = useState(0);

  const token = useContext(TokenContext) as string;

  const mutateDelete = useDeleteData();
  const mutateChange = useChangeData();
  const mutateNewAdd = useAddData();

  const handleOpenEdit = (idDoc: string, i: number) => {
    setId(idDoc);
    setOpenEdit(true);
    setIndex(i);
  };
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleClose = () => {
    setOpenEdit(false);
    setOpenNew(false);
  };

  const handlDelete = (idDoc: string) => {
    mutateDelete.mutate({
      token,
      id: idDoc,
    });
  };

  const handlChange = (
    requestData: Data,
    token: string,
    id: string | undefined
  ) => {
    mutateChange.mutate({
      requestData,
      token,
      id,
    });
  };

  const handlNewData = (
    requestData: Data,
    token: string,
    id: string | undefined
  ) => {
    mutateNewAdd.mutate({
      requestData,
      token,
    });
  };

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
    <Box>
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
            {data.map((row: Data, i) => (
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
                    <IconButton
                      aria-label="delete"
                      onClick={() => handlDelete(row.id)}
                    >
                      <DeleteIcon
                        sx={{
                          color: 'black',
                        }}
                      />
                    </IconButton>
                    <IconButton
                      aria-label="change"
                      onClick={() => handleOpenEdit(row.id, i)}
                    >
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
      {openEdit && (
        <EditCreateForm
          data={data[index]}
          open={openEdit}
          handleClose={handleClose}
          handlMutate={handlChange}
          id={id}
        />
      )}
      {openNew && (
        <EditCreateForm
          open={openNew}
          handleClose={handleClose}
          handlMutate={handlNewData}
          id={id}
        />
      )}
      <Button
        variant="contained"
        endIcon={<AddIcon />}
        onClick={() => handleOpenNew()}
      >
        Add
      </Button>
    </Box>
  );
}

export default AccessibleTable;
