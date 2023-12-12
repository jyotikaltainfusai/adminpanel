/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { DataGrid } from '@mui/x-data-grid';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import projectsTableData from "layouts/tables/data/projectsTableData";
import EditIcon from '@mui/icons-material/Edit';
// import { DeleteIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "utils/axiosInstance";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientDetails } from "store/slice/user/userSlice";
import { Button } from "@mui/material";
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const dispatch = useDispatch();
  const [controller, dispatchs] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const [state, setState] = React.useState();
  const clientdetails = useSelector((state) => state && state?.user && state?.user?.clients)
  const [open, setOpen] = React.useState(false);

  console.log('clientsdetails', clientdetails)

  const [row, setRows] = React.useState([]);
  console.log('rows', row)

  const [clientType, setClientType] = React.useState();
  const [country, setCountry] = React.useState();
  const [clientstatus, setClientStatus] = React.useState();
  const [city, setCity] = React.useState();
  const [dates, setDates] = React.useState(null);

  const handleSelectChangeClient = (event) => {
    setClientType(event.target.value);
  };

  const handleSelectChangecountry = (event) => {
    setCountry(event.target.value);
  };

  const handleSelectChangeClientStatus = (event) => {
    setClientStatus(event.target.value);
  };

  const handleSelectChangeCity = (event) => {
    setCity(event.target.value);
  };
  const handleSelectChangeDate = (event) => {
    setDates(event.target.value);
  };

  const initialState = {
    FIRST_NAME: '',
    LAST_NAME: '',
    COMPANY_NAME: '',
    ADMIN_EMAIL: '',
    PHONE: '',
    ADDRESS: '',
    COUNTRY_ID: '',
    ZIPCODE: '',
    CITY_ID: '',
    CLIENT_TYPE: '',
    REG_DATE: '',
    CLIENT_STATUS: '',
    PARTNER_ID: '',
  }

  const [clientInfo, setClientInfo] = React.useState(initialState);

  const inputChangeHandle = e => {
    const { name, value } = e.target
    setClientInfo({ ...clientInfo, [name]: value })
  }

  const register = e => {
    e.preventDefault();
    const data = {
      FIRST_NAME: clientInfo.FIRST_NAME,
      LAST_NAME: clientInfo.LAST_NAME,
      COMPANY_NAME: clientInfo.LAST_NAME,
      ADMIN_EMAIL: clientInfo.ADMIN_EMAIL,
      PHONE: clientInfo.PHONE,
      ADDRESS: clientInfo.ADDRESS,
      COUNTRY_ID: country,
      ZIPCODE: clientInfo.ZIPCODE,
      CITY_ID: city,
      CLIENT_TYPE: clientType,
      REG_DATE: dates,
      CLIENT_STATUS: clientstatus,
      PARTNER_ID: clientInfo.PARTNER_ID,

    }
    validateRegister(clientInfo);
    // console.log('clientinnfo',clientInfo)
  }

  const validateRegister = values => {
    if (!values.FIRST_NAME) {
      toast.error('Please fill the First Name Field');
    } else if (!values.LAST_NAME) {
      toast.error('Please fill the Last Name Field');
    } else if (!values.COMPANY_NAME) {
      toast.error('Please fill the Company Field');
    } else if (!values.ADMIN_EMAIL) {
      toast.error('Please fill the email Field');
    } else if (!values.PHONE) {
      toast.error('Please fill the Phone Field');
    } else if (!values.ADDRESS) {
      toast.error('Please fill the Address Field');
    } else if (!values.COUNTRY_ID) {
      toast.error('Please fill the Country Field');
    } else if (!values.ZIPCODE) {
      toast.error('Please fill the Zipcode Field');
    } else if (!values.CITY_ID) {
      toast.error('Please fill the City Field');
    } else if (!values.CLIENT_TYPE) {
      toast.error('Please fill the Client Type Field');
    } else if (!values.REG_DATE) {
      toast.error('Please fill the Reg Date Field');
    } else if (!values.CLIENT_STATUS) {
      toast.error('Please fill the Client Status Field');
    } else {
      alert('all field fill ')
    }

  }



  React.useEffect(() => {
    dispatch(getClientDetails())
  }, [])

  React.useEffect(() => {
    if (clientdetails?.length !== 0) {
      const datas = [];
      clientdetails && clientdetails.forEach((data, index) => {
        datas.push({
          id: index + 1,
          REG_DATE: data.reg_date,
          CLIENT_ID: data.client_id,
          FIRST_NAME: data.first_name,
          LAST_NAME: data.last_name,
          COMPANY_NAME: data.company_name,
          ADMIN_EMAIL: data.admin_email,
          PHONE_NUMBER: data.phone_number,
          ADDRESS: data.address,
          COUNTRY_ID: data.client_id,
          ZIPCODE: data.zipcode,
          CITY_ID: data.city_id,
          COUNTRY: data.country_name,
          CITY_NAME: data.city_name,
          CLIENT_TYPE: data.scope_client_type,
          CLIENT_STATUS: data.scope_client_status,
          CLIENT_TYPE_ID: data.client_type,
          CLIENT_STATUS_ID: data.client_status,
          PARTNER_ID: data.partner_id,
          CLIENT_API_BILING_RATE: data.client_api_biling_rate,
          CREATE_DATE: data.createdat,
        })
      });
      setRows(datas);
    }

  }, [clientdetails])

  const column = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'FIRST_NAME',
      headerName: 'First name',
      width: 150,
      // editable: true,
    },
    {
      field: 'LAST_NAME',
      headerName: 'Last name',
      width: 150,
      // editable: true,
    },
    {
      field: 'COMPANY_NAME',
      headerName: 'Company',
      type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: 'ADMIN_EMAIL',
      headerName: 'Email',
      type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: 'PHONE_NUMBER',
      headerName: 'Phone',
      type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: 'COUNTRY',
      headerName: 'Country',
      type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: 'CITY_NAME',
      headerName: 'City',
      type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: 'CLIENT_TYPE',
      headerName: 'Client Type',
      type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: 'CLIENT_STATUS',
      headerName: 'Client Status',
      type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: 'PARTNER_ID',
      headerName: 'Partner Id',
      type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: 'CLIENT_API_BILING_RATE',
      headerName: 'Client Api Biling Rate',
      type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: 'CREATE_DATE',
      headerName: 'Create Date',
      type: 'number',
      width: 110,
      // editable: true,
    },
    {
      headerName: "Actions",
      width: 160,
      renderCell: (params) => actionElement(params),
    },
  ];
  const handleedit = (params) => {
    alert('this is for edit ');
  };

  const handleView = (params) => {
    alert('this is for view');
  }

  const handleDelete = (params) => {
    if (window.confirm("Do You really want to delete blog") === true) {
      axiosInstance
        .delete("main/mycreate-blog?CLIENT_ID=" + params.row.CLIENT_ID)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            // window.location.reload();
          }
        });
    }
  };

  const actionElement = (params) => (
    <div className="action-wrapper">

      <RemoveRedEyeIcon
        onClick={() => handleView(params)}
        className="action-icon"
      />

      <EditIcon
        onClick={() => handleedit(params)}
      />



      <DeleteIcon
        onClick={() => handleDelete(params)}
        className="action-icon"
      />
    </div>
  );

  const rowss = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];



  return (
    <DashboardLayout>
      <DashboardNavbar />
      {
        open &&
        <section className="content mb-5">
          <div className="container-fluid">
            <div className="row">
              {/* <!-- left column --> */}
              <div className="col-md-12">
                {/* <!-- general form elements --> */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Add Client</h3>
                  </div>
                  {/* <!-- /.card-header -->
              <!-- form start --> */}
                  <form onClick={register}>
                    <div className="card-body">
                      <div className="col-md-12 d-flex gap-3" >
                        <div className="col-md-6">
                          <div className="form-group">
                            <label for="exampleInputEmail1">First Name</label>
                            <input type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="First Name"
                              onChange={inputChangeHandle}
                              name="FIRST_NAME"
                              value={clientInfo.FIRST_NAME}

                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleInputPassword1">Last Name</label>
                            <input type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Last Name"
                              onChange={inputChangeHandle}
                              name="LAST_NAME"
                              value={clientInfo.LAST_NAME}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleInputPassword1">Company Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Company Name"
                              onChange={inputChangeHandle}
                              name="COMPANY_NAME"
                              value={clientInfo.COMPANY_NAME}

                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleInputPassword1">Admin Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Admin Email"
                              onChange={inputChangeHandle}
                              name="ADMIN_EMAIL"
                              value={clientInfo.ADMIN_EMAIL}

                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleInputPassword1">Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Phone"
                              onChange={inputChangeHandle}
                              name="PHONE"
                              value={clientInfo.PHONE}
                            />
                          </div>
                          <div class="form-group">
                            <label>Address</label>
                            <textarea
                              class="form-control"
                              rows="3" placeholder="Enter ..."
                              onChange={inputChangeHandle}
                              value={clientInfo.ADDRESS}
                              name="ADDRESS"
                            ></textarea>
                          </div>
                          <div class="form-group">
                            <label>Client Type</label>
                            <select class="form-control" onChange={handleSelectChangeClient} value={clientType}>
                              <option value='option1'>option 1</option>
                              <option value='option2'>option 2</option>
                              <option value='option3'>option 3</option>
                              <option value='option4'>option 4</option>
                              <option value='option5'>option 5</option>
                            </select>
                          </div>

                        </div>


                        <div className="col-md-6">

                          <div class="form-group">
                            <label>City</label>
                            <select class="form-control" onChange={handleSelectChangeCity} value={city}>
                              <option value='option1'>option 1</option>
                              <option value='option2'>option 2</option>
                              <option value='option3'>option 3</option>
                              <option value='option4'>option 4</option>
                              <option value='option5'>option 5</option>
                            </select>
                          </div>
                          <div class="form-group">
                            <label>Country</label>
                            <select class="form-control" onChange={handleSelectChangecountry} value={country}>
                              <option value='option1'>option 1</option>
                              <option value='option2'>option 2</option>
                              <option value='option3'>option 3</option>
                              <option value='option4'>option 4</option>
                              <option value='option5'>option 5</option>
                            </select>
                          </div>
                          <div class="form-group">
                            <label>Client Status</label>
                            <select class="form-control" onChange={handleSelectChangeClientStatus} value={clientstatus}>
                              <option value='option1'>option 1</option>
                              <option value='option2'>option 2</option>
                              <option value='option3'>option 3</option>
                              <option value='option4'>option 4</option>
                              <option value='option5'>option 5</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label for="exampleInputPassword1">Zipcode</label>
                            <input
                              type="number"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Zipcode"
                              onChange={inputChangeHandle}
                              value={clientInfo.ZIPCODE}
                              name="ZIPCODE"
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleInputPassword1">Reg Date</label>
                            <input
                              type="date"
                              className="form-control"
                              // id="exampleInputPassword1"
                              id="exampleDate"
                              placeholder="Reg Date"
                              onChange={handleSelectChangeDate}
                              onClick={handleSelectChangeDate}
                              value={dates}
                              name="REG_DATE"
                            />
                            {/* <input type="date"/> */}
                            
                          </div>
                          <div className="form-group">
                            <label for="exampleInputPassword1">Partner Id</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Partner Id"
                              onChange={inputChangeHandle}
                              name="PARTNER_ID"
                              value={clientInfo.PARTNER_ID}

                            />
                          </div>

                        </div>

                      </div>



                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                      </div>
                    </div>
                    {/* <!-- /.card-body --> */}

                    <div className="card-footer">
                      <button type="submit" onClick={register} className="btn btn-primary">Submit</button>
                    </div>
                  </form>
                </div>
                {/* <!-- /.card -->

            <!-- general form elements --> */}

                {/* <!-- /.card --> */}

                {/* <!-- Input addon --> */}

                {/* <!-- /.card -->
            <!-- Horizontal Form --> */}

                {/* <!-- /.card --> */}

              </div>
              {/* <!--/.col (left) --> */}
              {/* <!-- right column --> */}

              {/* <!--/.col (right) --> */}
            </div>
            {/* <!-- /.row --> */}
          </div>
          {/* <!-- /.container-fluid --> */}
        </section>
      }
      <MDBox p={2} mt="auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        <MDButton variant="gradient" onClick={() => setOpen(true)} color={sidenavColor}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add Client
        </MDButton>
      </MDBox>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Client Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {clientdetails &&
                  <DataGrid
                    sx={{ padding: '1.5rem' }}
                    rows={row}
                    columns={column}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    // checkboxSelection
                    experimentalFeatures={{ newEditingApi: true }}
                    disableRowSelectionOnClick
                  />}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
