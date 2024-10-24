import { useState } from "react"
import payOSApiInstance from "../../utils/ApiInstance/payOSApiInstance"

const AccountWallet = () => {

  const [amount, setAmount] = useState(0)
  const [walletId, setWalletId] = useState('8FB9EA3D-7F4C-45DC-9152-069B49485847')

  const createPaymentLink = () => {
    const walletRequest = {
      'Id': walletId,
      'Balance': amount
    }

    const queryString = new URLSearchParams(walletRequest).toString();
    window.location.href = `https://localhost:7044/api/payos/create-payment-link?${queryString}`
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAmount(value)
  }

  return (
    <>
      <div>
        Wallet balance:
      </div>
      <div>
        Temp Wallet (for request withdraw):
      </div>
      <input
        name='amount'
        type="number"
        value={amount}
        onChange={handleInputChange}
      />
      <button
        onClick={createPaymentLink}
      >Create payment link</button>
    </>
  )
}

export default AccountWallet