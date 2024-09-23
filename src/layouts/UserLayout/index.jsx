import React from 'react'
import { Outlet } from 'react-router'
import FunFundingAppBar from '../../components/AppBar'
import Footer from '../../components/Footer'

function UserLayout() {
    return (
        <>
            <FunFundingAppBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default UserLayout