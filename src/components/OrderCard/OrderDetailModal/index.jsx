import React, { useState } from 'react'
import {
    Button,
    CircularProgress,
    Divider,
    IconButton,
    Paper,
    Tooltip,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import { FaArrowDown } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";
import { IoRemoveCircle } from "react-icons/io5";
import { RiDiscountPercentFill } from "react-icons/ri";
const OrderDetailModal = ({ details }) => {
    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const day = String(formattedDate.getDate()).padStart(2, '0');
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const year = formattedDate.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(price);
    };
    const [expanded, setExpanded] = useState(null);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };
    return (
        <div>
            <Paper
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: '1rem',
                    px: '2rem',
                    backgroundColor: 'var(--white)',
                    borderRadius: '0.625rem',
                    fontWeight: '700',
                    fontSize: '1rem',
                    justifyContent: 'space-between',
                    mb: '2rem'
                }}
                elevation={3}
            >
                <Typography sx={{ flexGrow: 1, color: 'var(--black)', width: '45%', fontWeight: '600', fontSize: '1rem', }}>Game name</Typography>
                <Typography sx={{ width: '25%', color: 'var(--black)', fontWeight: '600', fontSize: '1rem', }}>Price</Typography>
                <Typography sx={{ width: '15%', color: 'var(--black)', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', }}>Discount<RiDiscountPercentFill /></Typography>
                <Typography sx={{ width: '15%', color: 'var(--black)', visibility: 'hidden', fontSize: '1rem', }}>Action</Typography>
            </Paper>
            {details &&
                details.map((item, index) => (
                    <Accordion
                        key={index}
                        expanded={expanded === index}
                        onChange={handleAccordionChange(index)}
                        sx={{
                            marginBottom: "1rem",
                            borderRadius: "0.625rem",
                            overflow: "hidden",
                            "&:before": {
                                display: "none",
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<FaArrowDown />}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                py: "1rem",
                                px: "2rem",
                                backgroundColor: "var(--white)",
                                "& .MuiAccordionSummary-content": {
                                  alignItems: "center",
                                },
                            }}
                        >
                            <div className="flex flex-row justify-start items-center w-[45%]">
                                <img
                                    className="w-[5rem] h-[5rem] object-cover rounded-[0.25rem] flex-shrink-0 mr-[1.5rem]"
                                    src={
                                        item.digitalKey.marketingProject.marketplaceFiles?.find(
                                            (file) => file.fileType === 2
                                        )?.url || NoImage
                                    }
                                    alt={item.digitalKey.marketingProject.name}
                                />
                                <div className="flex flex-col justify-between max-h-[5rem]">
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "1rem",
                                            color: "var(--black)",
                                            display: "-webkit-box",
                                            overflow: "hidden",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 2,
                                            textOverflow: "ellipsis",
                                            mr: "1.5rem",
                                            mb: "1rem",
                                        }}
                                    >
                                        {item.digitalKey.marketingProject.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: "300",
                                            fontSize: "0.875rem",
                                            color: "var(--black)",
                                            textAlign: "left",
                                        }}
                                    >
                                        Added date: {formatDate(item.digitalKey.createdDate)}
                                    </Typography>
                                </div>
                            </div>
                            {item.projectCoupon ? (
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "1rem",
                                        width: "25%",
                                    }}
                                >
                                    <span style={{ textDecoration: "line-through" }}>
                                        {formatPrice(item.price)} VND
                                    </span>
                                    <br />
                                    <span
                                        style={{
                                            color: "var(--primary-green)",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {formatPrice(item.discountedPrice)} VND
                                    </span>
                                </Typography>
                            ) : (
                                <>
                                    <Typography
                                        sx={{
                                            fontWeight: "500",
                                            fontSize: "1rem",
                                            width: "25%",
                                        }}
                                    >
                                        {formatPrice(item.digitalKey.marketingProject.price)} VND
                                    </Typography>
                                    <Typography sx={{ fontWeight: '600', width: '15%', textAlign: 'center', fontSize: '1.5rem' }}>
                                        0%
                                    </Typography>
                                </>

                            )}
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: "2rem", py: "1rem" }}>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Detailed Table or Information Goes Here
                            </Typography>
                            {/* Example table */}
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        <th
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                textAlign: "left",
                                            }}
                                        >
                                            Column 1
                                        </th>
                                        <th
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                textAlign: "left",
                                            }}
                                        >
                                            Column 2
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                            }}
                                        >
                                            Data 1
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                            }}
                                        >
                                            Data 2
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </AccordionDetails>
                    </Accordion>
                ))}

            {/* digital Key */}
        </div>
    )
}

export default OrderDetailModal