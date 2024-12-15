import { Add } from "@mui/icons-material"
import { useCategoryApi } from "../../../utils/Hooks/Category"
import CategoryModal from "./CategoryModal"
import { useState } from "react"
import { ToastContainer } from "react-toastify"

const ManageCategory = () => {

  const [reload, setReload] = useState(false)

  const { cateData, error } = useCategoryApi("all", "GET", null, reload)

  const [openModal, setOpenModal] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const [selectedCate, setSelectedCate] = useState()


  return (
    <>
      <section class="bg-gray-50 p-3 sm:p-5">
        <ToastContainer />
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div class="w-full md:w-1/2 font-semibold text-gray-700">
                Manage categories
              </div>
              <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  onClick={() => { setModalAdd(true); setOpenModal(true) }}
                  class="flex items-center justify-center text-white bg-primary-green hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                  <Add />
                  Add category
                </button>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" class="px-4 py-3">Name</th>
                    <th scope="col" class="px-4 py-3">Created date</th>
                    <th scope="col" class="px-4 py-3">Is deleted</th>
                    <th scope="col" class="px-4 py-3">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cateData?._data.map((c, index) => (
                      <tr key={index} class="border-b">
                        <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{c.name}</th>
                        <td class="px-4 py-3">{new Date(c.createdDate).toLocaleString()}</td>
                        <td class="px-4 py-3">{c.isDeleted.toString().toUpperCase()}</td>
                        <td class="px-4 py-3 flex items-center justify-end">
                          <button
                            onClick={() => { setSelectedCate(c); setModalAdd(false); setOpenModal(true); }}
                            id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none" type="button">
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  }


                </tbody>
              </table>
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              <span class="text-sm font-normal text-gray-500">
                Showing
                <span class="font-semibold text-gray-900"> 1-10</span>
                {" "}of
                <span class="font-semibold text-gray-900"> 1000</span>
              </span>
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
        </div>
      </section>
      {
        cateData && (
          <CategoryModal openModal={openModal} setOpenModal={setOpenModal} selectedCate={selectedCate} modalAdd={modalAdd} setSelectedCate={setSelectedCate} reload={reload} setReload={setReload} />
        )
      }
    </>
  )
}

export default ManageCategory