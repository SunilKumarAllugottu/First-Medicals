import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "./Firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { SiGoogledocs } from "react-icons/si";
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddDriver from './AddDriver';
import { useAppStore } from '../appStore';



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    minWidth:300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  


export default function Driverlist() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [rows, setRows] = useState([]);
  const setRows=useAppStore((state)=>state.setRows)
  const rows=useAppStore((state)=>state.rows)
  const empCollectionRef = collection(db, "Driver");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  



  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id,isOnline:false })));
  };

  
  // const getUsers = async () => {
  //   try {
  //     const data = await getDocs(empCollectionRef);
  //     if (Array.isArray(data.docs)) {
  //       setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, isOnline: false })));
  //     } else {
  //       console.error("Data.docs is not an array:", data.docs);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  

  
 useEffect(() => {
    getUsers();
  }, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };


  const deleteApi = async (id) => {
    const userDoc = doc(db, "Driver", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      getUsers();
    }
  };


  const toggleStatus = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, isOnline: !row.isOnline } : row
      )
    );
  };


  return (
<>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddDriver closeEvent={handleClose}/>
        </Box>
      </Modal>
    </div>


    <Paper sx={{ width: '100%', overflow: 'hidden' }}> 
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.driver || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search " />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button style={{backgroundColor:"#0054A4"}} variant="contained" endIcon={<AddCircleIcon />}onClick={handleOpen}>
              Add
            </Button>
          </Stack>
          <Box height={10} />


      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>


              <TableCell
                  align="center"
                  style={{ minWidth: "100px" ,fontWeight:"900"}}
                >
                  Driver Name
                </TableCell>


                <TableCell
                  align="center"
                  style={{ minWidth: "100px",fontWeight:"900" }}
                >
                  Email
                </TableCell>


                <TableCell
                  align="center"
                  style={{ minWidth: "100px",fontWeight:"900" }}
                >
                  Contact
                </TableCell>


                <TableCell
                  align="center"
                  style={{ minWidth: "100px",fontWeight:"900" }}
                >
                  Vehicle
                </TableCell>


                <TableCell
                  align="center"
                  style={{ minWidth: "100px",fontWeight:"900" }}
                >
                  Documents
                </TableCell>


                <TableCell
                  align="center"
                  style={{ minWidth: "100px",fontWeight:"900" }}
                >
                  Status
                </TableCell>


                <TableCell
                  align="center"
                  style={{ minWidth: "100px",fontWeight:"900" }}
                >
                  Action
                </TableCell>


                
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1} >
                    
                        <TableCell  align="center">
                          {row.driver}
                        </TableCell>


                        <TableCell  align="center">
                          {row.email}
                        </TableCell>


                        <TableCell  align="center">
                          {row.contact}
                        </TableCell>


                        <TableCell  align="center">
                          {row.vehicle}
                        </TableCell>


                        <TableCell  align="center">
                          {/* {row.documents} */}
                          <SiGoogledocs style={{
                            cursor:"pointer",
                            fontSize:"30px",
                            Color:"white"
                          }} onClick={handleOpen}/>
                        </TableCell>

                        <TableCell align="center">
                {/* <button
                  className={`btn ${row.isOnline ? 'btn-success' : 'btn-danger'}`}
                  onClick={() => toggleStatus(row.id)}
                >
                  {row.isOnline ? 'Online' : 'Offline'}
                </button> */}
              </TableCell>

              <TableCell align="center">
                          <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                            <EditIcon
                              style={{
                                fontSize: "25px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              // onClick={() => editUser(row.id)}
                            />
                        
                            <DeleteIcon
                              style={{
                                fontSize: "25px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>

                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10, 25,50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
</>
  );
}