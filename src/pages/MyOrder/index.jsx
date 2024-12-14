import { Box, Typography } from '@mui/material'
import Cookies from "js-cookie"
import React, { useEffect, useState } from 'react'
import OrderCard from '../../components/OrderCard'
import { useLoading } from '../../contexts/LoadingContext'
import orderApiInstace from '../../utils/ApiInstance/orderApiInstance'
const MyOrder = () => {
    const token = Cookies.get("_auth");
    const { isLoading, setIsLoading } = useLoading();
    const [orders, setOrders] = useState([]);
    const fetchOrders = async () => {
        setIsLoading(true);
        await orderApiInstace.get('all-orders', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data);
            if (res.data._statusCode == 200) {
                setOrders(res.data._data.items);
            }
            setIsLoading(false);
        }).catch(err => {
            setOrders([]);
        })
    }
    useEffect(() => {
        fetchOrders();
    }, [])
    return (
        <Box sx={{ paddingLeft: '4rem', paddingRight: '5.5rem' }}>
            <Typography sx={{ fontSize: '28px', paddingY: '20px', fontWeight: '600' }}>
                Order History
            </Typography>
            <Box>
                {orders.map(order => <OrderCard key={order.id} order={order} />)}
                <OrderCard />
            </Box>
        </Box>
    )
}

export default MyOrder