import { useState } from 'react';

const RewardItemTable = ({ packageData, setPackageData }) => {
  console.log('packageData: ' + JSON.stringify(packageData.rewardItems))
  const [isAdding, setIsAdding] = useState(false);
  const [newRewardItem, setNewRewardItem] = useState({
    name: '',
    description: '',
    quantity: 0,
    imageFile: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editRewardItem, setEditRewardItem] = useState(null);

  const handleNewRewardItemChange = (e) => {
    const { name, value } = e.target;
    setNewRewardItem((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditRewardItemChange = (e) => {
    const { name, value } = e.target;
    setEditRewardItem((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddItemClick = () => {
    setIsAdding(true);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewRewardItem({ name: '', description: '', quantity: 0, imageFile: '' });
  };

  const handleConfirmAdd = () => {
    setPackageData((prev) => ({
      ...prev,
      rewardItems: [...prev.rewardItems, newRewardItem]
    }));
    setIsAdding(false);
    setNewRewardItem({ name: '', description: '', quantity: 0, imageFile: '' });
  };

  const handleEditItemClick = (index) => {
    setEditingIndex(index);
    setEditRewardItem(packageData.rewardItems[index]);
  };

  const handleSaveEdit = () => {
    const updatedRewardItems = packageData.rewardItems.map((item, index) =>
      index === editingIndex ? editRewardItem : item
    );
    setPackageData((prev) => ({
      ...prev,
      rewardItems: updatedRewardItems
    }));
    setEditingIndex(null);  // Exit edit mode
  };

  const handleDeleteItem = (index) => {
    const updatedRewardItems = packageData.rewardItems.filter((_, i) => i !== index);
    setPackageData((prev) => ({
      ...prev,
      rewardItems: updatedRewardItems
    }));
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 text-center w-[15%]">Item image</th>
              <th scope="col" className="py-3 text-center w-[25%]">Name</th>
              <th scope="col" className="py-3 text-center w-[30%]">Description</th>
              <th scope="col" className="py-3 text-center w-[10%]">Quantity</th>
              <th scope="col" className="py-3 text-center w-[20%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packageData.rewardItems?.map((item, index) => (
              editingIndex === index ? (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-2 py-4 flex justify-center">
                    <label className="flex items-center justify-center w-[3rem] h-[3rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" name="imageFile" onChange={handleEditRewardItemChange} />
                    </label>
                  </td>
                  <td className="px-2 py-4">
                    <input
                      type="text"
                      name="name"
                      value={editRewardItem.name}
                      placeholder="Reward name"
                      onChange={handleEditRewardItemChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1 w-full"
                    />
                  </td>
                  <td className="px-2 py-4">
                    <textarea
                      name="description"
                      rows={1}
                      value={editRewardItem.description}
                      placeholder="Reward description"
                      onChange={handleEditRewardItemChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1 w-full"
                    />
                  </td>
                  <td className="px-2 py-4 text-center">
                    <input
                      type="number"
                      name="quantity"
                      value={editRewardItem.quantity}
                      placeholder="Quantity"
                      onChange={handleEditRewardItemChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1 w-full"
                    />
                  </td>
                  <td className="px-2 py-4 text-center">
                    <button
                      onClick={handleSaveEdit}
                      className="mr-2 font-medium text-green-600 dark:text-green-500 hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleDeleteItem(index)}
                      className="mr-2 font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="font-medium text-gray-600 dark:text-gray-500 hover:underline"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-2 py-4 flex justify-center">
                    <label className="flex items-center justify-center w-[3rem] h-[3rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                      </div>
                    </label>
                  </td>
                  <td className="px-2 py-4 text-center">{item.name}</td>
                  <td className="px-2 py-4 text-center">{item.description}</td>
                  <td className="px-2 py-4 text-center">{item.quantity}</td>
                  <td className="px-2 py-4 text-center">
                    <button
                      onClick={() => handleEditItemClick(index)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
            ))}
            {isAdding ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-2 py-4 flex justify-center">
                  <label className="flex items-center justify-center w-[3rem] h-[3rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" name="imageFile" onChange={handleNewRewardItemChange} />
                  </label>
                </td>
                <td className="px-2 py-4">
                  <input
                    type="text"
                    name="name"
                    value={newRewardItem.name}
                    placeholder="Reward name"
                    onChange={handleNewRewardItemChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1 w-full"
                  />
                </td>
                <td className="px-2 py-4">
                  <textarea
                    name="description"
                    rows={1}
                    value={newRewardItem.description}
                    placeholder="Reward description"
                    onChange={handleNewRewardItemChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1 w-full"
                  />
                </td>
                <td className="px-2 py-4 text-center">
                  <input
                    type="number"
                    name="quantity"
                    value={newRewardItem.quantity}
                    placeholder="Quantity"
                    onChange={handleNewRewardItemChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1 w-full"
                  />
                </td>
                <td className="px-2 py-4 text-center">
                  <button
                    onClick={handleConfirmAdd}
                    className="mr-2 font-medium text-green-600 dark:text-green-500 hover:underline"
                  >
                    Add
                  </button>
                  <button
                    onClick={handleCancelAdd}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td colSpan={5} className="py-4 text-center">
                  <button
                    onClick={handleAddItemClick}
                    className="px-4 py-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Add item
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RewardItemTable;
