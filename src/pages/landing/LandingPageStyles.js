import {Box, Stack, Typography, styled} from "@mui/material"

export const AwesomeText = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('sm')]:{
        marginTop:".6em",
        fontSize:"2rem"
    }
}))

export const ButtonsContainer = styled(Stack)(({theme})=> ({
    [theme.breakpoints.down('sm')]:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        height:"100px"
    }
}))