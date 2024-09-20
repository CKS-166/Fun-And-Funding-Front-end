import React from 'react'
import {
    Table, TableBody, TableCell, TableHead
    , TableRow, Avatar
} from '@mui/material';
const BackerSection = () => {
    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="left">Backer's name</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left">Time</TableCell>
                    <TableCell align="left">Package type</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow >
                    <TableCell><Avatar>H</Avatar></TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">2000</TableCell>
                    <TableCell align="left">Time</TableCell>
                    <TableCell align="left">Type</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default BackerSection