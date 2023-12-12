import React from 'react'
import TableComponent from './TableComponent'

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


const PartnerTable = () => {
  return (
    <>
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox p={2} mt="auto" style={{display:'flex',flexDirection:'column',alignItems:'flex-end',justifyContent:'flex-end'}}>
        <MDButton variant="gradient"  
        // color={sidenavColor}
        
        >
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
              <TableComponent/>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
    </>
  )
}

export default PartnerTable