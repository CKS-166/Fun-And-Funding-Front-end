import { AccountBalance } from "@mui/icons-material"
import { useState } from "react"
import { useWalletApi } from "../../utils/Hooks/AccountWallet"
import BankAccountSettingModal from "./BankAccountSettingModal"
import WalletModal from "./WalletModal"


const AccountWallet = () => {

  const { data, loading, error, bankAccData } = useWalletApi("/user")

  const [openModal, setOpenModal] = useState(false)
  const [modalAddMoney, setModalAddMoney] = useState(false)

  const [openBankSetting, setOpenBankSetting] = useState(false)

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

  const transactionTypeString = [
    'Funding Donation',
    'Add money',
    'Withdraw wallet',
    'Funding withdraw',
    'Commission Fee',
    'Funding refund',
    'Funding Purchase',
    'Order Purchase',
    'Marketplace Withdraw'
  ]

  return (
    <div className="pr-[5.5rem] pl-[3rem] mt-[2rem]">
      <div className="flex gap-4">
        <div class="w-3/6 p-6 bg-white border border-gray-200 rounded-lg shadow">
          <span class="mb-3 font-semibold text-gray-500">Total Balance</span>
          <p className="h-[3.5rem]">
            <h5 class="mb-2 py-1 text-4xl font-bold tracking-tight text-gray-900">
              {data?._data.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <span class="mb-3 text-lg font-normal text-gray-700">VND</span>
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
          <span class="mb-3 font-semibold text-gray-500">Bank Account</span>
          <div className="h-[3.5rem] flex items-center w-[100%]">
            {
              bankAccData?._data.bankCode === ""
                ? (
                  <div className="flex h-[80%] justify-center items-center w-[100%] text-gray-600 font-semibold text-sm uppercase bg-gray-100 rounded">
                    No bank account linked
                  </div>
                )
                :
                (
                  <div className="text-4xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                    <AccountBalance sx={{ fontSize: '2rem', color: 'var(--primary-green)' }} /> {bankAccData?._data.bankCode} - {bankAccData?._data.bankNumber}
                  </div>
                )
            }
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setOpenBankSetting(true)}
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-green rounded-lg hover:bg-primary-green/80">
              Setting
            </button>
          </div>

        </div>
      </div>

      <div class="w-full min-h-[25rem] mt-[1rem] p-6 bg-white border border-gray-200 rounded-lg shadow">
        <span class="mb-3 font-semibold text-gray-500">Transactions History</span>
        <div class="relative overflow-x-auto mt-[1rem]">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-3 py-3">
                  Type
                </th>
                <th scope="col" class="px-3 py-3">
                  Description
                </th>
                <th scope="col" class="px-3 py-3">
                  Amount
                </th>
                <th scope="col" class="px-3 py-3">
                  Time span
                </th>
                {/* <th scope="col" class="px-3 py-3">
                  Type
                </th> */}
                <th scope="col" class="px-3 py-3">
                  {/* Action */}
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data?._data.transactions.map((value, index) => (
                  <tr key={index} class="bg-white border-b">
                    <th class="px-3 py-4">
                      {transactionTypeString[value.transactionType]}
                    </th>
                    <td class="px-3 py-4">
                      {value.description}
                    </td>
                    <td class="px-3 py-4">
                      {value.totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                    </td>
                    <td class="px-3 py-4">
                      {new Date(value.createdDate).toLocaleString()}
                    </td>
                    <td class="px-3 py-4">
                      <button>View</button>
                    </td>
                  </tr>
                ))
              }


            </tbody>
          </table>
        </div>
      </div>

      <WalletModal openModal={openModal} modalAddMoney={modalAddMoney} handleCloseModal={handleCloseModal} walletId={data?._data.id} />

      <BankAccountSettingModal openModal={openBankSetting} setOpenModal={setOpenBankSetting} walletId={data?._data.id} />

      {/* <TestNotification />

      <NotificationMenu /> */}

    </div>
  )
}

export default AccountWallet