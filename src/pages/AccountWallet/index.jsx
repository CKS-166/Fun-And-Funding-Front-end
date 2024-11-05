import { useState } from "react"
import payOSApiInstance from "../../utils/ApiInstance/payOSApiInstance"
import WalletModal from "./WalletModal"
import { useWalletApi } from "../../utils/Hooks/AccountWallet"
import TestNotification from "../TestNotification"
import ProjectMilestoneReviewList from "../../components/ProjectMilestoneBacker/ProjectMilestoneReviewList"
import ProjectMilestoneReviewForm from "../../components/ProjectMilestoneBacker/ProjectMilestoneReviewForm"



const AccountWallet = () => {

  const { data, loading, error } = useWalletApi("/user")

  const [openModal, setOpenModal] = useState(false)
  const [modalAddMoney, setModalAddMoney] = useState(false)

  const handleOpenAddMoneyModal = () => {
    setModalAddMoney(true)
    setOpenModal(true)
  }

  const handleOpenAddWithdrawModal = () => {
    setModalAddMoney(false)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <div className="flex gap-4">
        <div class="w-3/6 p-6 bg-white border border-gray-200 rounded-lg shadow">
          <span class="mb-3 font-semibold text-gray-500">Total Balance</span>
          <p>
            <h5 class="mb-2 py-1 text-3xl font-bold tracking-tight text-gray-900">
              {data?._data.balance} <span class="mb-3 text-lg font-normal text-gray-700">VND</span>
            </h5>
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleOpenAddMoneyModal}
              href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-green rounded-lg hover:bg-primary-green/80">
              Add money
            </button>

            <button
              onClick={handleOpenAddWithdrawModal}
              href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-green rounded-lg hover:bg-primary-green/80">
              Withdraw
            </button>
          </div>

        </div>

        <div class="w-3/6 p-6 bg-white border border-gray-200 rounded-lg shadow">
          <span class="mb-3 font-semibold text-gray-500">Processing money</span>
          <p>
            <h5 class="mb-2 py-1 text-3xl font-bold tracking-tight text-gray-900">
              XXX <span class="mb-3 text-lg font-normal text-gray-700">VND</span>
            </h5>
          </p>
          <div className="flex gap-3">
            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-green rounded-lg hover:bg-primary-green/80">
              View detail
            </a>
          </div>

        </div>
      </div>

      <div class="w-full min-h-[25rem] mt-[1rem] p-6 bg-white border border-gray-200 rounded-lg shadow">
        <span class="mb-3 font-semibold text-gray-500">Transactions History</span>
        <div class="relative overflow-x-auto mt-[1rem]">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>
                <th scope="col" class="px-6 py-3">
                  Amount
                </th>
                <th scope="col" class="px-6 py-3">
                  Time span
                </th>
                {/* <th scope="col" class="px-6 py-3">
                  Type
                </th> */}
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data?._data.transactions.map((value, index) => (
                  <tr key={index} class="bg-white border-b">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {value.description}
                    </th>
                    <td class="px-6 py-4">
                      {value.totalAmount} đ
                    </td>
                    <td class="px-6 py-4">
                      {value.createdDate}
                    </td>
                    {/* <td class="px-6 py-4">
                      {value.transactionType}
                    </td> */}
                    <td class="px-6 py-4">
                      <button>View details</button>
                    </td>
                  </tr>
                ))
              }


            </tbody>
          </table>
        </div>
      </div>

      <WalletModal openModal={openModal} modalAddMoney={modalAddMoney} handleCloseModal={handleCloseModal} walletId={data?._data.id} />

      <ProjectMilestoneReviewForm />
      <ProjectMilestoneReviewList />


    </>
  )
}

export default AccountWallet