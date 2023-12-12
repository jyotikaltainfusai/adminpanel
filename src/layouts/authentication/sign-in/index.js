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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { adminLogin } from "store/slice/user/userSlice";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch()

  const initialState = {
    USER_NAME: '',
    PASSWORD: ''
  }

  const [loginInfo, setLoginInfo] = useState(initialState)

  const inputChangeHandle = e => {
    const { name, value } = e.target
    setLoginInfo({ ...loginInfo, [name]: value })
  }

  const login = e => {
    e.preventDefault()
    validateSignupUser(loginInfo)
  }

  const validateSignupUser = values => {
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (!values.USER_NAME) {
      toast.error('USER_NAME is required')
      return false
    } 
    // else if (!regEx.test(values.USER_NAME)) {
    //   toast.error('Enter a valid USER_NAME')
    //   return false
    // }

    if (!values.PASSWORD) {
      toast.error('PASSWORD is empty')
      return false
    } else if (values.PASSWORD.length < 6) {
      toast.error('PASSWORD required minimum 6 char')
      return false
    } else {
      dispatch(adminLogin(values))


      // axios
      //   .post('https://weather-back-ebon.vercel.app/login', loginInfo)
      //   .then(res => {
      //     if (res.status === 200) {
      //       console.log(res.data)
      //       sessionStorage.setItem(
      //         'accessToken',
      //         `Bearer ${res.data.myAccessToken}`
      //       )
      //       sessionStorage.setItem(
      //         'refreshToken',
      //         `Bearer ${res.data.myRefreshToken}`
      //       )
      //       sessionStorage.setItem('userrole', `Bearer ${res.data.userrole}`)

      //       toast.success('login Success')

      //       setLoginInfo({ USER_NAME: '', PASSWORD: '' })
      //       navigate('/')
      //     }
      //   })
      //   .catch(err => {
      //     toast.error(err.response.data.res)
      //   })
    }
  }

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="User Name"
                placeholder='USER_NAME'
                onChange={inputChangeHandle}
                name='USER_NAME'
                value={loginInfo.USER_NAME}

                fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password"

                placeholder='Password'
                onChange={inputChangeHandle}
                name='PASSWORD'
                value={loginInfo.PASSWORD} fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1} >
              <MDButton onClick={login} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
