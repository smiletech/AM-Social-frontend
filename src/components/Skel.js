import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


function Skel() {
    return (
        <div>
            <Stack spacing={1}>
                <Skeleton variant="text" />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={118} />
            </Stack>
        </div>
    )
}

export default Skel