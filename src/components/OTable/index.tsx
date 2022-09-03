import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {FC} from "react";

const StyledTableContainer = styled(TableContainer)(() => ({
  '&': {
    borderRadius: '0'
  }
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(34,34,34)',
    color: '#E5C180',
    fontWeight: '400',
    fontSize: 15,
    border: 'none',
    height: 36
  },
  [`&.${tableCellClasses.body}`]: {
    fontWeight: '400',
    fontSize: 15,
    color: '#fff',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#1B1B1C',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#191919',
  },
  '& td': {
    border: 0,
    height: 36,
    padding: '0 16px;'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },

}));


interface Props<T = any> {
  rows: T[],
  columns: {
    dataIndex: string,
    align?: 'left' | 'right' | 'center'
    title?: string,
    [key: string]: any
  }[]
}
const OTables:FC<Props> = ({rows, columns}) => {
  return (
    <StyledTableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              columns.map((item, index) => (
                <StyledTableCell key={index} align={item.align ?? 'left'}>{item.title}</StyledTableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              {
                columns.map((item, index) => (
                  <StyledTableCell key={index} scope="row" align={item.align ?? 'left'}>
                    {row[item.dataIndex] ?? ''}
                  </StyledTableCell>
                ))
              }

              {/* <StyledTableCell align="right">{row.calories}</StyledTableCell> */}
              {/* <StyledTableCell align="right">{row.fat}</StyledTableCell> */}
              {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell> */}
              {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default OTables
