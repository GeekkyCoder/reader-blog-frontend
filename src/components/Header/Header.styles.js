import {
    Box,
    Toolbar,
    Typography,
    styled,
    Button
  } from "@mui/material";

  import {createTheme} from "@mui/material"

  export const theme = createTheme({
    palette:{
        primary:{
            main:"#27285C",
        }
    }
  })

 export const HeaderContainer = styled(Box)(({ theme }) => ({}));

  export const LogoText = styled(Typography)(({ theme }) => ({
      textDecoration:"none",
      fontWeight:"bold",

  }));

  export const StyledToolbar = styled(Toolbar)(({theme}) => ({
     display:"flex",
     justifyContent:"space-between",
     alignItems:"center"
  }))

  export const  SignUpButton = styled(Button)(({theme}) => ({
   color:"whitesmoke",
   textTransform:"uppercase",
   letterSpacing:"2px",
   fontWeight:"bold",
   "&:hover":{
     backgroundColor:"#27445C",
     fontWeight:"medium"
   }
 }))

