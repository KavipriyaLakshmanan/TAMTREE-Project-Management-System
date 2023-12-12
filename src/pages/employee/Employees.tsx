import {
  Box,
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Employee } from "../../types/type";
import EmployeeDrawer from "../../drawer/EmployeeDrawer";
import ProjectDialogBox from "../../commonDialogBox/ProjectDialogBox";
import toast from "react-hot-toast";
import { useDeleteEmployee, useEmployeeQuery } from "../../hooks/CustomRQHooks";
import CircularProgress from "@mui/material/CircularProgress";

const newEmployee: Employee = {
  _id: "",
  employeeId: "",
  email: "mohi@gmail.com",
  age: 1,
  contact: "6374723428",
  firstName: "Mohi",
  gender: "Female",
  lastName: "Kavi",
  address: "Namakkal",
};
const Employees = () => {
  const deleteEmployeeMutation = useDeleteEmployee();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [deleteDialogConfirmationOpen, setdeleteDialogConfirmationOpen] =
    useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<Employee | null>(
    null
  );

  const { isLoading, error, data: employeeData, refetch } = useEmployeeQuery();

  const employees = employeeData || [];
  console.log(employees);

  const handleEmployeeEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDrawerOpen(true);
  };

  const handleEmployeeAddClick = () => {
    setSelectedEmployee(newEmployee);
    setIsDrawerOpen(true);
    setIsDrawerOpen(true);
    refetch();
  };

  const handleEmployeeDeleteClick = (employee: Employee) => {
    setDeleteConfirmation(employee);
    setdeleteDialogConfirmationOpen(true);
  };

  const handleDeleteCancel = () => {
    setdeleteDialogConfirmationOpen(false);
  };

  const handleDeleteConfirmClick = () => {
    setdeleteDialogConfirmationOpen(true);

    if (deleteConfirmation?._id) {
      deleteEmployeeMutation.mutate(deleteConfirmation._id);
      toast.success("Employee deleted successfully");
      setDeleteConfirmation(null);
      setdeleteDialogConfirmationOpen(false);
      refetch();
    }
  };

  return (
    <>
      <>
        {isLoading && (
          <IconButton
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <CircularProgress />
          </IconButton>
        )}
      </>
      <Container>
        <Box display={"flex "} justifyContent={"space-between"}>
          <Typography variant="h6">Employees</Typography>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleEmployeeAddClick}
          >
            + Add Employee
          </Button>
        </Box>
        <TableContainer
          sx={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            marginTop: 3,
          }}
        >
          <Table>
            <TableHead className="table_head">
              <TableRow>
                <TableCell align="center">EMPLOYEE ID</TableCell>
                <TableCell align="center">FIRST NAME</TableCell>
                <TableCell align="center">LAST NAME</TableCell>
                <TableCell align="center">EMAIL</TableCell>
                <TableCell align="center">GENDER</TableCell>
                <TableCell align="center">AGE</TableCell>
                <TableCell align="center">CONTACT</TableCell>
                <TableCell align="center">ADDRESS</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{employee.employeeId}</TableCell>
                  <TableCell align="center">{employee.firstName}</TableCell>
                  <TableCell align="center">{employee.lastName}</TableCell>
                  <TableCell align="center">{employee.email}</TableCell>
                  <TableCell align="center">{employee.gender}</TableCell>
                  <TableCell align="center">{employee.age}</TableCell>
                  <TableCell align="center">{employee.contact}</TableCell>
                  <TableCell align="center">{employee.address}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEmployeeEditClick(employee)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleEmployeeDeleteClick(employee)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <ProjectDialogBox
        deleteDialogConfirmationOpen={deleteDialogConfirmationOpen}
        handleDeleteCancel={handleDeleteCancel}
        handleDeleteClickConfirm={handleDeleteConfirmClick}
      />
      {isDrawerOpen && (
        <EmployeeDrawer
          isDrawerOpen={isDrawerOpen}
          handleDrawerClose={() => setIsDrawerOpen(false)}
          selectedEmployee={selectedEmployee}
          refetchEmployees={refetch}
        />
      )}
    </>
  );
};

export default Employees;
