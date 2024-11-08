import { Box, Modal } from "@mui/material"


const PMRequirementModal = ({ pmrData, openPMRequirement, setOpenPMRequirement }) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1
  };

  const handleClose = () => {
    setOpenPMRequirement(false)
  }

  console.log(pmrData)

  return (
    <>
      <Modal
        open={openPMRequirement}
        onClose={handleClose}
      >
        <div className="flex justify-center items-center w-full h-full">
          <div class="relative p-4 w-full max-w-[45%] max-h-full overflow-auto scrollbar-hidden">
            <div class="relative bg-white rounded-lg shadow min-h-[80vh] ">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-primary-green">
                <h3 class="text-xl font-semibold text-white flex uppercase">
                  Requirement response
                </h3>
                <button type="button" onClick={handleClose} class="end-2.5 text-gray-400 bg-transparent text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              {
                pmrData &&
                (
                  <div className="p-5">
                    <div className="text-sm italic font-semibold text-gray-500 text-right">Last updated at {new Date(pmrData.updateDate).toLocaleString()}</div>
                    <div className="mb-5">
                      <div className="font-semibold text-gray-700 my-1">Response content</div>
                      <div className="" dangerouslySetInnerHTML={{ __html: pmrData.content }} />
                    </div>

                    <div>
                      <div className="font-semibold text-gray-700 my-1">Response files</div>
                      <div>

                      </div>
                      <div>
                        <div class="grid grid-cols-2 gap-2">
                          {
                            pmrData.requirementFiles.length > 0
                              ? pmrData.requirementFiles.map((file, index) => {
                                if (file.filetype == 6)
                                  return (<div>
                                    <img class="h-auto max-w-full rounded-lg" src={file.url} alt="" />

                                  </div>)
                                else
                                  return (<div>
                                    <video class="h-auto max-w-full rounded-lg" controls alt="">
                                      <source src={file.url} type="video/mp4" />
                                    </video>
                                  </div>)
                              })
                              : 'No files available'

                          }
                        </div>
                      </div>
                    </div>

                  </div>
                )
              }


            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default PMRequirementModal