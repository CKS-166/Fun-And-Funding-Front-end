import React from 'react'
import {
    Table, TableBody, TableCell, TableHead
    , TableRow, Avatar
} from '@mui/material';
const BackerSection = ({ backers }) => {
    console.log(backers)
    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#1BAA64" }}>
                <TableRow >
                    <TableCell></TableCell>
                    <TableCell sx={{ color: '#ffffff' }} align="left">Backer's name</TableCell>
                    <TableCell sx={{ color: '#ffffff' }} align="left">Total Donate Amount</TableCell>
                </TableRow>
            </TableHead>
            {backers.map(backer => (
                <>

                    <TableBody>
                        <TableRow >
                            <TableCell><Avatar>{backer.url ? <img src={backer.url} /> : "H"}</Avatar></TableCell>
                            <TableCell align="left">{backer.name}</TableCell>
                            <TableCell align="left">{backer.donateAmount.toLocaleString("de-DE")}</TableCell>

                        </TableRow>
                    </TableBody>
                </>

            ))}

        </Table>
    )
}

export default BackerSection