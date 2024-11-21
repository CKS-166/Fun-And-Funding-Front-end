import React, { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { useLoading } from '../../contexts/LoadingContext'
import Cookies from "js-cookie"
import orderApiInstace from '../../utils/ApiInstance/orderApiInstance'
import OrderCard from '../../components/OrderCard'
const MyOrder = () => {
    const token = Cookies.get("_auth");
    const { isLoading, setIsLoading } = useLoading();
    const [orders, setOrders] = useState([]);
    const fetchOrders = async () => {
        setIsLoading(true);
        await orderApiInstace.get('', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data);
            if(res.data._statusCode == 200) {
                setOrders(res.data._data.items);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            alert(err)
        })
    }
    useEffect(() => {
        fetchOrders();
    }, [])
    return (
        <Box>
            <Typography sx={{ fontSize: '28px', paddingY: '20px', fontWeight: '600' }}>
                Order History
            </Typography>
            <Box>
                {orders.map(order => <OrderCard key={order.id} order={order}/>) }
                <OrderCard/>
            </Box>
        </Box>
    )
}

export default MyOrder