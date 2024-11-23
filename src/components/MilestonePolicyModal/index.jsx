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
            {/* Modal */}
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
                    {/* Modal Title */}
                    <div className="flex flex-col items-center mb-6">
                        <img src={logo} alt="Logo" className="w-[4.875rem] h-[5.5rem] mb-4" />
                        <h2 className="text-4xl font-bold text-gray-800 mb-1.5">
                            Milestone Policies
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Please read carefully before proceeding
                        </p>
                    </div>
                    {/* Highlighted Information */}
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
                            When you first request milestone disbursement, we will deduct the
                            applied commission fee rate from your project wallet balance.
                            Please ensure you are aware of the commission rate applied.
                        </Typography>
                    </Box>
                    <Typography
                        id="milestone-policy-title"
                        variant="h5"
                        component="h2"
                        fontWeight="bold"
                        sx={{ mb: 2 }}
                    >
                        Milestone Process Policy
                    </Typography>

                    {/* Policy Overview */}
                    <Typography id="milestone-policy-description" variant="body1" sx={{ mb: 3 }}>
                        Once a project is successfully funded, the project owner can initiate
                        the milestone process to receive funding disbursements and deliver key
                        milestones to backers. Below is the detailed policy:
                    </Typography>

                    {/* Process Steps */}
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        Milestone Request Process:
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="body1">
                                    <strong>1. Eligibility to Request:</strong> Requests must be
                                    submitted within 15 days of the project funding date.
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="body1">
                                    <strong>2. Admin Approval:</strong> 50% of the milestone percentage
                                    will be disbursed upon approval.
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="body1">
                                    <strong>3. Completion and Review:</strong> The remaining 50% will
                                    be disbursed after backer review and successful milestone
                                    completion.
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>

                    {/* Milestones */}
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mb: 2 }}>
                        List of Milestones:
                    </Typography>
                    <List>
                        {/* Milestone 1 */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="body1">
                                    <strong>Milestone 1 (10%):</strong> Gameplay Features
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    Define the gameplay features to be developed, including core
                                    mechanics, character abilities, and level designs. This acts as the
                                    blueprint for project progress.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        {/* Milestone 2 */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="body1">
                                    <strong>Milestone 2 (0.25%):</strong> Mockup Evidence
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    Provide mockup evidence showcasing the design and functionality
                                    of the planned gameplay features, including wireframes, UI/UX
                                    prototypes, or concept art.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        {/* Milestone 3 */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="body1">
                                    <strong>Milestone 3 (0.25%):</strong> Gameplay Beta Version
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    Deliver a beta version of the gameplay, demonstrating partially
                                    functional features. Backers can test and review the gameplay to
                                    ensure progress.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        {/* Milestone 4 */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="body1">
                                    <strong>Milestone 4 (Final):</strong> Final Game Version and Rewards
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    Submit the final game version, including all promised features
                                    and functionalities, and deliver all reward items promised during
                                    the funding process.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </List>

                    {/* Refund Policy */}
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mb: 2 }}>
                        Refund Policy:
                    </Typography>
                    <Typography variant="body1">
                        If a milestone is not completed, backers will be notified, and the
                        remaining funds will be refunded proportionally to the backers.
                    </Typography>

                    {/* Close Button */}
                    <Box sx={{ textAlign: "right", mt: 4 }}>
                        <Button sx={{ bgcolor: '#1BAA64' }} variant="contained" color="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default MilestonePolicyModal;