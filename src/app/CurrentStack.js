import * as React from 'react';
import ImageUploading from 'react-images-uploading';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { ST } from 'next/dist/shared/lib/utils';

export default function CurrentStack( {rows} ) {
    return (
        <Stack className="CURRENT_STACK" overflow={"scroll"} height={539.5} gap={4}>
            {rows.map((row, index) => (
                <Stack key={row[0]} gap={1}>
                    <Typography>Card {index+1}</Typography>
                    <Typography sx={{border: 1, borderColor: 'gray', padding:1, borderRadius:"8px"}} overflow={"scroll"} height={150} width={300} alignItems={"center"} justifyContent={"center"}>
                        {row[0]}
                    </Typography>

                    <Typography sx={{border: 1, borderColor: 'gray', padding:1, borderRadius:"8px"}} overflow={"scroll"} height={150} width={300} alignItems={"center"} justifyContent={"center"}>
                        {row[1]}
                    </Typography>
                </Stack>
            ))}
        </Stack>
    )
}