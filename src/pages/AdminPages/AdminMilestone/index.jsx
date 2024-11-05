import { useState } from "react"
import { useProjectMilestoneApi } from "../../../utils/Hooks/ProjectMilestone"
import ProjectMilestoneModal from "./ProjectMilestoneModal"

const AdminMilestone = () => {
  const { data, error } = useProjectMilestoneApi()

  const [openModal, setOpenModal] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState(null)

  const pmStatus = ['Pending', 'Processing', 'Completed', 'Warning', 'Failed', 'Submitted']

  const handleOpenModal = (fundingProject) => {
    setSelectedMilestone(fundingProject)
    setOpenModal(true)
  }

  return (
    <>
      <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
          <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div class="w-full md:w-1/2">
              <span class="text-sm font-normal text-gray-500">
                Showing <span class="font-semibold text-gray-900">{data?._data.totalItems} </span>
                {/* of <span class="font-semibold text-gray-900">1000 </span> */}
                Milestone disbursement requests
              </span>
            </div>
            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <div class="flex items-center space-x-3 w-full md:w-auto">
                <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                  </svg>
                  Filter
                  <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" class="px-4 py-3">Milestone</th>
                  <th scope="col" class="px-4 py-3">Created date</th>
                  <th scope="col" class="px-4 py-3">End date</th>
                  <th scope="col" class="px-4 py-3">Funding Project</th>
                  <th scope="col" class="px-4 py-3">Amount</th>
                  <th scope="col" class="px-4 py-3">Status</th>
                  <th scope="col" class="px-4 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?._data.items.map((pm, index) => (
                  <tr key={index} class="border-b">
                    <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{pm.milestoneName}</th>
                    <td class="px-4 py-3">{new Date(pm.createdDate).toLocaleString()}</td>
                    <td class="px-4 py-3">{new Date(pm.endDate).toLocaleString()}</td>
                    <td class="px-4 py-3">
                      {/* <img class="w-10 h-10 rounded" src={pm.fundingProject.fundingFiles.} alt="Default avatar" /> */}
                      {pm.fundingProject.name}
                    </td>
                    <td class="px-4 py-3">{pm.milestone.disbursementPercentage * pm.fundingProject.balance} đ</td>
                    <td class="px-4 py-3">
                      <span class='bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded'>
                        {pmStatus[pm.status]}
                      </span>
                    </td>
                    <td class="px-4 py-3 flex items-center justify-end">
                      <button onClick={() => handleOpenModal(pm)} class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none" type="button">
                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <div></div>
            <ul class="inline-flex items-stretch -space-x-px list-none">
              <li>
                <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                  <span class="sr-only">Previous</span>
                  <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</a>
              </li>
              <li>
                <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</a>
              </li>
              <li>
                <a href="#" aria-current="page" class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700">3</a>
              </li>
              <li>
                <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">...</a>
              </li>
              <li>
                <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">100</a>
              </li>
              <li>
                <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                  <span class="sr-only">Next</span>
                  <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div >

      <ProjectMilestoneModal openModal={openModal} setOpenModal={setOpenModal} pmData={selectedMilestone} />
    </>
  )
}

export default AdminMilestone