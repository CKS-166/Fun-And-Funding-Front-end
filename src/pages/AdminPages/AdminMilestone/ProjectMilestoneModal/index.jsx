import { ArrowRightAlt } from "@mui/icons-material"
import { Box, Divider, Grid2, Modal, Step, StepLabel, Stepper, Tab, Tabs } from "@mui/material"
import projectMilestoneApiInstace from "../../../../utils/ApiInstance/projectMilestoneApiInstance"
import { useState } from "react"
import QRCodeModal from "./QRCodeModal"
import PMRequirementModal from "./PMRequirementModal"


const ProjectMilestoneModal = ({ pmData, openModal, setOpenModal }) => {

  const handleClose = () => {
    setOpenModal(false)
  }

  const [openQRCode, setOpenQRCode] = useState(false)
  const [openPMRequirement, setOpenPMRequirement] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const [selectedPMR, setSelectedPMR] = useState(null)

  const handleOpenPMR = (pmr) => {
    setSelectedPMR(pmr)
    setOpenPMRequirement(true)
  }

  const statusString = ['Deleted',
    'Pending',
    'Processing',
    'FundedSuccessful',
    'Successful',
    'Failed',
    'Rejected',
    'Approved',
    'Withdrawed',
    'Refunded',
    'Reported']

  const pmrStatusString = [
    'ToDo',
    'Doing',
    'Done',
    'Warning',
    'Failed'
  ]

  const handleApprove = async () => {
    try {
      const response = await projectMilestoneApiInstace.put("/", {
        ProjectMilestoneId: pmData?.id,
        Status: 2
      });
      console.log("Milestone approved:", response.data);
    } catch (error) {
      console.error("Error approving milestone:", error);
    } finally {
      handleClose()
    }
  };

  const handleWarn = async () => {
    try {
      const response = await projectMilestoneApiInstace.put("/", {
        ProjectMilestoneId: pmData?.id,
        Status: 3
      });
      console.log("Milestone rejected:", response.data);
    } catch (error) {
      console.error("Error rejecting milestone:", error);
    } finally {
      handleClose()
    }

  };

  const handleProcess = async () => {
    try {
      const response = await projectMilestoneApiInstace.put("/", {
        ProjectMilestoneId: pmData?.id,
        Status: 1
      });
      console.log("Milestone rejected:", response.data);
    } catch (error) {
      console.error("Error rejecting milestone:", error);
    } finally {
      handleClose()
    }

  };

  const handleFail = async () => {
    try {
      const response = await projectMilestoneApiInstace.put("/", {
        ProjectMilestoneId: pmData?.id,
        Status: 4
      });
      console.log("Milestone rejected:", response.data);
    } catch (error) {
      console.error("Error rejecting milestone:", error);
    } finally {
      handleClose()
    }

  };

  const formatNumber = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function renderStatusButton(pmData, handleProcess, handleApprove, handleWarn, handleFail) {
    if (pmData?.status == null) return null;


    switch (pmData.status) {
      case 0: // Pending
        return (
          <button
            onClick={handleProcess}
            className="text-white bg-gradient-to-r from-primary-green/70 via-primary-green/80 to-primary-green hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
            Change to processing
          </button>
        );
      case 1:
        return (
          <div>
            {/* <button
              onClick={handleProcess}
              className="text-white bg-gradient-to-r from-primary-green/70 via-primary-green/80 to-primary-green hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
              Process
            </button> */}
            Game owner is working on evidence
          </div>
        )
      case 5: // Submitted
        return (
          <div>
            <button
              onClick={handleApprove}
              className="text-white bg-gradient-to-r from-primary-green/70 via-primary-green/80 to-primary-green hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
              Approve project milestone
            </button>
            <button
              onClick={handleWarn}
              className="text-white bg-red-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
              Warning project milestone
            </button>
          </div>
        );

      case 3: // Warning
        return (
          <div>
            <button
              onClick={handleApprove}
              className="text-white bg-gradient-to-r from-primary-green/70 via-primary-green/80 to-primary-green hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
              Approve project milestone
            </button>
            <button
              onClick={handleFail}
              className="text-white bg-red-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
              Fail project milestone
            </button>
          </div>
        );

      // Optionally, you can add a default case for any unknown status or error handling
      default:
        return null;
    }
  }

  const milestones = [
    'Milestone 1',
    'Milestone 2',
    'Milestone 3',
    'Milestone 4'
  ];

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
      >

        <div className="flex justify-center items-center w-full h-full">
          <div class="relative p-4 w-full max-w-[55%] max-h-full overflow-auto scrollbar-hidden">
            <div class="relative bg-white rounded-lg shadow min-h-[100vh] pb-[7rem]">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-primary-green">
                <h3 class="text-xl font-semibold text-white flex uppercase">
                  Funding withdraw request
                </h3>
                <button type="button" onClick={handleClose} class="end-2.5 text-gray-400 bg-transparent text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div class="p-4 md:p-5">
                <Stepper activeStep={pmData?.milestone.milestoneOrder} alternativeLabel>
                  {milestones.map((milestone) => (
                    <Step key={milestone}>
                      <StepLabel
                        sx={{
                          '& .MuiStepIcon-root.Mui-active': {
                            color: 'var(--primary-green) !important',
                          }
                        }}
                      >{milestone}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', my: '1.5rem', }}>
                  <Tabs
                    value={activeTab}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                  >
                    <Tab value={0} label="Overview" />
                    <Tab value={1} label="Project evidence" />
                  </Tabs>
                </Box>

                {
                  activeTab === 0
                    ? (
                      <div>
                        <div className="flex justify-center items-center gap-5 my-2 bg-gray-100 rounded overflow-hidden shadow-md">
                          <div className="w-[50%] h-[12rem] overflow-hidden flex justify-center items-center">
                            <img class=" h-auto object-contain transition-transform hover:scale-75" alt="Funding project image" src={pmData?.fundingProject.fundingFiles.find((e) => e.filetype == 2)?.url} />
                          </div>
                          <div className="w-[50%] h-[12rem] py-2">
                            <div className="text-primary-green items-center">
                              {statusString[pmData?.fundingProject.status]}

                            </div>
                            <div className="text-2xl font-bold">
                              {pmData?.fundingProject.name}
                            </div>
                            <div className="text-sm font-norml">
                              {pmData?.fundingProject.description}
                            </div>
                            <div className="text-sm font-light text-gray-500">
                              by <span className="italic font-semibold">{pmData?.fundingProject.user.email}</span>
                            </div>
                            <div className="text-sm mb-2.5">
                              Fund raised: <span className="font-semibold">{formatNumber(pmData?.fundingProject.balance)}/{formatNumber(pmData?.fundingProject.target)} đ</span>
                            </div>
                            <button className="text-white bg-gradient-to-r text-xs from-primary-green/70 via-primary-green/80 to-primary-green hover:bg-gradient-to-br font-medium rounded-lg px-3 text-center me-2 mb-2">
                              Go to project <ArrowRightAlt />
                            </button>
                          </div>
                        </div>

                        <div class="relative overflow-x-auto sm:rounded-lg mt-[1rem] shadow-md">
                          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                              Milestone request
                            </caption>
                            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                              <tr>
                                <th scope="col" class="px-6 py-3 bg-gray-50">
                                  Information
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  Value
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr class="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white">
                                  (1) {pmData?.milestone.milestoneName} disbursement percentage
                                </th>
                                <td class="px-6 py-4">
                                  {pmData?.milestone.disbursementPercentage * 100}%
                                </td>
                              </tr>
                              <tr class="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white">
                                  (2) Total fund
                                </th>
                                <td class="px-6 py-4">
                                  {pmData?.fundingProject.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                                </td>
                              </tr>
                              <tr class="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white">
                                  Milestone requested amount = (1) x (2)
                                </th>
                                <td class="px-6 py-4 font-bold text-black text-lg">
                                  {(pmData?.milestone.disbursementPercentage * pmData?.fundingProject.balance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="flex justify-end mt-3">
                          <button type="button"
                            onClick={() => setOpenQRCode(true)}
                            class="text-white bg-primary-green font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Transfer fund</button>
                        </div>
                        {pmData && (
                          <QRCodeModal openQRCode={openQRCode} setOpenQRCode={setOpenQRCode} pmData={pmData} />
                        )}


                      </div>
                    )
                    : (
                      <div>
                        {/* <div className="flex justify-center">
                          <Divider sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.7)', my: '1rem', width: '60%', textAlign: 'center' }}>Milestone evidence</Divider>
                        </div> */}
                        <div class="relative overflow-x-auto">
                          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                            <caption class="px-5 pb-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white">
                              {/* Project milestone requirement */}
                              <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                At each milestone, game owners must fulfill the corresponding requirements before they can withdraw the funds raised.</p>
                            </caption>
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                              <tr>
                                <th scope="col" class="px-6 py-3">
                                  Requirement
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  Last update
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  {/* Action */}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {pmData?.projectMilestoneRequirements.map((pmr, index) => (
                                <tr class="bg-white border-b">
                                  <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                    <div className="">
                                      <span className="py-.5">
                                        {pmr.requirementTitle}
                                      </span>
                                    </div>
                                    <div className="font-normal italic">
                                      {pmr.reqDescription}
                                    </div>
                                  </td>
                                  <td class="px-6 py-4">
                                    <span className="text-xs text-right text-gray-600 italic font-semibold">{new Date(pmr.updateDate).toLocaleString()}</span>
                                  </td>
                                  <td class="px-6 py-4">
                                    <span className="bg-blue-200 text-blue-800 px-2 py-.5 ml-2 rounded font-semibold">
                                      {pmrStatusString[pmr.requirementStatus]}
                                    </span>
                                  </td>
                                  <td class="px-6 py-4">
                                    <a href="#"
                                      onClick={() => handleOpenPMR(pmr)}
                                      class="font-medium text-blue-600 hover:underline">View</a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <PMRequirementModal pmrData={selectedPMR} openPMRequirement={openPMRequirement} setOpenPMRequirement={setOpenPMRequirement} />
                      </div>
                    )
                }

              </div>
              <div className="absolute bottom-0 w-[100%]">
                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  {pmData ? renderStatusButton(pmData, handleProcess, handleApprove, handleWarn, handleFail) : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ProjectMilestoneModal