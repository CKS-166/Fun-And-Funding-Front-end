import { ArrowRightAlt } from "@mui/icons-material"
import { Divider, Grid2, Modal } from "@mui/material"
import projectMilestoneApiInstace from "../../../../utils/ApiInstance/projectMilestoneApiInstance"


const ProjectMilestoneModal = ({ pmData, openModal, setOpenModal }) => {

  const handleClose = () => {
    setOpenModal(false)
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
    if (!pmData?.status) return null;

    switch (pmData.status) {
      case 0: // Pending
        return (
          <button
            onClick={handleProcess}
            className="text-white bg-gradient-to-r from-primary-green/70 via-primary-green/80 to-primary-green hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
            Process
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
              Approve
            </button>
            <button
              onClick={handleWarn}
              className="text-white bg-red-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
              Warning
            </button>
          </div>
        );

      case 3: // Warning
        return (
          <div>
            <button
              onClick={handleApprove}
              className="text-white bg-gradient-to-r from-primary-green/70 via-primary-green/80 to-primary-green hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
              Approve
            </button>
            <button
              onClick={handleFail}
              className="text-white bg-red-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
              Fail
            </button>
          </div>
        );

      // Optionally, you can add a default case for any unknown status or error handling
      default:
        return null;
    }
  }


  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
      >
        <div className="flex justify-center items-center w-full h-full">
          <div class="relative p-4 w-full max-w-[55%] max-h-full overflow-auto scrollbar-hidden">
            <div class="relative bg-white rounded-lg shadow min-h-[25rem]">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-primary-green">
                <h3 class="text-xl font-semibold text-white flex uppercase">
                  Funding withdraw request
                </h3>
                <button type="button" onClick={handleClose} class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-4 md:p-5">
                <div className="text-lg mb-1 font-semibold">Project overview</div>
                <div className="flex justify-center items-center gap-5 my-2 bg-gray-100 rounded overflow-hidden">
                  <div className="w-[50%] h-[12rem] overflow-hidden flex justify-center items-center">
                    <img class=" h-auto object-contain transition-transform hover:scale-75" alt="Funding project image" src={pmData?.fundingProject.fundingFiles.find((e) => e.filetype == 2)?.url} />
                  </div>
                  <div className="w-[50%] h-[12rem] py-2">
                    <div className="text-primary-green">{statusString[pmData?.fundingProject.status]}</div>
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
                    <button className="text-white bg-gradient-to-r from-primary-green/70 via-primary-green/80 to-primary-green hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
                      Go to project <ArrowRightAlt />
                    </button>
                  </div>
                </div>
                <Divider />
                <div className="my-3.5">
                  <div className="text-lg font-semibold">
                    Project milestone requirement
                  </div>
                  <p class="mt-1 text-sm font-normal text-gray-500">
                    At each milestone, game owners must fulfill the corresponding requirements before they can withdraw the funds raised.
                  </p>
                </div>

                <div class="relative overflow-x-auto">
                  <table class="w-full text-sm text-left rtl:text-right">
                    <thead class="text-xs uppercase">
                      <tr className="bg-primary-green text-gray-100">
                        <th scope="col" class="px-6 py-3 w-[40%] border-r-2">
                          Requirement information
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Game owner's response
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pmData?.projectMilestoneRequirements.map((pmr, index) => (
                        <tr class="bg-white">
                          <th scope="row" class="px-6 py-4 border-r-2">
                            <div className="">
                              <span className="py-.5">
                                {pmr.requirementTitle}
                              </span>
                              <span className="bg-blue-200 text-blue-800 px-2 py-.5 ml-2 rounded">
                                {pmrStatusString[pmr.requirementStatus]}
                              </span>
                            </div>
                            <div className="font-normal italic">
                              {pmr.reqDescription}
                            </div>
                          </th>
                          <td class="px-6 py-4">
                            <div className="text-right mb-2">
                              <span className="text-xs text-right text-gray-600 italic font-semibold">Last update at {new Date(pmr.updateDate).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center mb-2.5">
                              <label class="block mb-2 text-sm font-medium text-gray-900 w-[20%]">Content</label>
                              <textarea value={pmr.content} disabled readOnly rows="1" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 ">
                              </textarea>
                            </div>
                            <div className="flex items-center">
                              <label class="block mb-2 text-sm font-medium text-gray-900 w-[20%]">Files</label>
                              {
                                pmr.requirementFiles.length > 0
                                  ? pmr.requirementFiles.map((file, index) => {
                                    return file.fileType === 6 ? (
                                      <img key={index} src={file.url} alt={`file-${index}`} />
                                    ) : (
                                      <video key={index} controls>
                                        <source src={file.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                      </video>
                                    );
                                  })
                                  : 'No files available'
                              }
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Divider sx={{ mt: '3.5rem', mb: '1rem' }} />
                <div className="my-3.5">
                  <div className="text-lg font-semibold">
                    Transfer Funds to the Game Owner's Bank Account
                  </div>
                  <p class="mt-1 text-sm font-normal text-gray-500">
                    After reviewing, scan the provided QR code to proceed the payment to the game owner's bank account
                    and commplete the milestone review
                  </p>
                </div>

                <div className="flex">
                  <div className="w-[50%] py-5">
                    <div className="mb-5">
                      <h2 class="mb-1 text-sm font-semibold text-yellow-700">Notes:</h2>
                      <ul class="max-w-md text-yellow-700 text-sm list-disc list-inside ">
                        <li className="py-1">
                          Approve milestone requests only after you have successfully transferred funds to the game owner's bank account.
                        </li>
                        <li className="py-1">
                          Only approve if all the responses fulfill the milestone requirements
                        </li>
                        <li className="py-1">
                          Double-check all details before transferring funds.
                        </li>
                      </ul>
                    </div>
                    {renderStatusButton(pmData, handleProcess, handleApprove, handleWarn, handleFail)}
                    {/* <button onClick={handleApprove} className="text-white bg-gradient-to-r from-primary-green/70 via-primary-green/80 to-primary-green hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
                      Approve
                    </button>

                    <button onClick={handleReject} className="text-white bg-red-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
                      Reject
                    </button>
                    <button onClick={handleClose} className="text-white bg-red-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
                      Cancel
                    </button> */}
                  </div>
                  <div className="w-[50%]">
                    <img src={`https://img.vietqr.io/image/${pmData?.fundingProject.wallet.bankAccount.bankCode}-${pmData?.fundingProject.wallet.bankAccount.bankNumber}-compact2.jpg?amount=${pmData?.fundingProject.balance * pmData?.milestone.disbursementPercentage}&addInfo=milestone%20request`} />
                  </div>
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