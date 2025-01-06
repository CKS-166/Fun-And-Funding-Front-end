import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import logo from "../../assets/OnlyLogo.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MilestonePolicyModal = ({ open, handleClose }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="milestone-policy-title"
                aria-describedby="milestone-policy-description"
                disableAutoFocus
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        maxHeight: "90%",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        overflowY: "auto",
                    }}
                >
                    <div className="flex flex-col items-center mb-6">
                        <img src={logo} alt="Logo" className="w-[4.875rem] h-[5.5rem] mb-4" />
                        <h2 className="text-4xl font-bold text-gray-800 mb-1.5">Milestone Policies</h2>
                        <p className="text-gray-500 mt-1">Please read carefully before proceeding</p>
                    </div>
                    <Box
                        sx={{
                            mb: 4,
                            p: 2,
                            borderLeft: "5px solid #f44336",
                            bgcolor: "#fff5f5",
                        }}
                    >
                        <Typography variant="body1" color="error" fontWeight="bold">
                            Important Note for Owners:
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Milestone disbursement will deduct the applied commission fee from the project wallet balance. Please ensure you are aware of this rate.
                        </Typography>
                    </Box>

                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                        Milestone Process Policy
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Below are the guidelines for each milestone. Owners can request funds upon achieving specific goals and milestones:
                    </Typography>

                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        List of Milestones:
                    </Typography>
                    <List>
                        {/* Milestone 1 */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="body1">
                                    <strong>Milestone 1 (0%):</strong> Gameplay Features
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    Provide a comprehensive overview of gameplay features, including key mechanics and level designs. This is intended to attract backers.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        {/* Milestone 2 */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="body1">
                                    <strong>Milestone 2 (20%):</strong> Mockups & Withdraw Funds
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    Showcase mockups, concept art, and prototypes for planned features. Owners can withdraw <strong>50% of donations</strong> once the project reaches <strong>20% of its funding goal</strong>.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        {/* Milestone 3 */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="body1">
                                    <strong>Milestone 3 (40%):</strong> Gameplay Beta Version
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    Deliver a functional beta version for backers to test. Funds are disbursed 50%-50% upon admin approval and completion.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        {/* Milestone 4 */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="body1">
                                    <strong>Milestone 4 (Final):</strong> Full Game & Rewards
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    Deliver the final game version along with all backer rewards. The final disbursement is made upon completion.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </List>

                    <Box sx={{ textAlign: "right", mt: 4 }}>
                        <Button sx={{ bgcolor: "#1BAA64" }} variant="contained" color="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default MilestonePolicyModal;