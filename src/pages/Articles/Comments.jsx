import { Avatar, Box, Typography } from "@mui/material"
import { formatDate } from "../../utils/convertToDate"

const Comments = ({comment}) => {
    return <Box my={'1em'}>
        <Box display={'flex'} alignItems={"center"} >
         <Avatar sx={{alignSelf:"flex-start"}}  src="https://img.freepik.com/premium-vector/flat-instagram-icons-notifications_619991-50.jpg" alt={comment.name}
         ></Avatar>
         <Box mx={'1em'}>
            <Typography variant="p" component={'p'} fontWeight={800} >{comment.name}</Typography>
            <Typography variant="p" component={'p'} fontSize={'14px'} color={'GrayText'}>{comment.bio}</Typography>
            <Typography variant="p" component={'p'} color={'GrayText'}>{formatDate(comment.createdAt)}</Typography>
            <Box my={'1em'}>
                <Typography variant="p" component={'p'} fontWeight={800}>{comment.content}</Typography>
            </Box>
         </Box>
        </Box>
    </Box>
}

export default Comments