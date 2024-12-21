import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Chip,
} from '@mui/material';
import transactionApiInstance from '../../../../utils/ApiInstance/transactionApiInstance';
import { useParams } from 'react-router-dom';

const MilestoneOverview = () => {
  const { id } = useParams(); // Project ID from the URL
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactionApiInstance.get(`?projectId=${id}&filter=1`);
        if (response.data._isSuccess) {
          setTransactions(response.data._data);
        } else {
          console.error("Failed to fetch transactions:", response.data._message);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id]);

  const getTransactionTypeLabel = (type) => {
    switch (type) {
      case 9: return "Initial Transfer";
      case 10: return "Final Transfer";
      case 4: return "Commission Fee";
      default: return "Unknown";
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Milestone Transaction Overview
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Milestone Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Transaction Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Disbursement %</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Created Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.milestoneName}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={getTransactionTypeLabel(transaction.transactionType)}
                      color={
                        transaction.transactionType === 9
                          ? "primary"
                          : transaction.transactionType === 10
                          ? "success"
                          : "secondary"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {transaction.commissionFeeId ? (transaction.commissionFee * 100).toFixed(2) :
                    (transaction.disbursementPercentage * 100).toFixed(2)}%
                  </TableCell>
                  <TableCell>
                  {transaction.totalAmount.toLocaleString()} VND
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.createdDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default MilestoneOverview;