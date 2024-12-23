import { TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLoading } from "../../../contexts/LoadingContext";
import userApiInstance from "../../../utils/ApiInstance/userApiInstance";
import CreateUserModal from "./CreateUserModal";
import UserDetailModal from "./UserDetailModal";

const userStatus = ["Inactive", "Active"];

function AdminUsers() {
  const { isLoading, setIsLoading } = useLoading();
  const [userList, setUserList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchUserList();
  }, [pageIndex, searchValue]);

  const fetchUserList = async () => {
    try {
      setIsLoading(true);
      const res = await userApiInstance.get(``, {
        params: {
          pageSize: pageSize,
          pageIndex: pageIndex + 1,
          searchValue: searchValue,
        },
      });
      if (res.data._statusCode == 200) {
        setUserList(res.data._data);
        setPageIndex(res.data._data.pageIndex - 1);
        setPageSize(res.data._data.pageSize);
        setTotalItems(res.data._data.totalItems);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("de-DE").format(price);
  };

  const handleOpenModal = (userId) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageIndex(0);
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-[2rem] my-8">
        <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <span className="text-base font-normal text-gray-500">
                Showing total of{" "}
                <span className="font-semibold text-gray-900">
                  {userList.totalItems ?? "0"}{" "}
                </span>
                Accounts
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label for="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full pl-10 p-2"
                    placeholder="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                type="button"
                className="flex items-center justify-center text-white bg-[var(--primary-green)] hover:bg-[#159653] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
                onClick={() => handleOpenCreateModal()}
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add account
              </button>

              <button
                id="filterDropdownButton"
                data-dropdown-toggle="filterDropdown"
                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="h-4 w-4 mr-2 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  />
                </svg>
                Filter
                <svg
                  className="-mr-1 ml-1.5 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Fullname
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Created Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Wallet Balance
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {userList.items &&
                  userList.items.length > 0 &&
                  userList.items.map((user, index) => (
                    <tr key={index} className="border-b">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {user.email}
                      </th>
                      <td className="px-4 py-3">{user.userName}</td>
                      <td className="px-4 py-3">{user.fullName}</td>
                      <td className="px-4 py-3">
                        {new Date(user.createdDate).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {formatPrice(user.wallet?.balance)}{" "}
                        <span className="text-[0.75rem]">VND</span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${user.userStatus === 1
                            ? "bg-[var(--primary-green)] text-[var(--white)]"
                            : "bg-[var(--red)] text-[var(--white)]"
                            }`}
                        >
                          {userStatus[user.userStatus]}
                        </span>
                      </td>

                      <td className="px-4 py-3 flex items-center justify-end">
                        <button
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none"
                          type="button"
                          onClick={() => handleOpenModal(user.id)}
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M17.414 2.586a2 2 0 00-2.828 0l-9 9A2 2 0 005 14v3a1 1 0 001 1h3a2 2 0 001.414-.586l9-9a2 2 0 000-2.828l-2-2zM7 14v-1.586L14.586 5l1.586 1.586L8.586 15H7z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <TablePagination
            component="div"
            count={totalItems}
            page={pageIndex}
            onPageChange={handleChangePage}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
      <UserDetailModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedUserId={selectedUserId}
        fetchUserList={fetchUserList}
      />
      <CreateUserModal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
        fetchUserList={fetchUserList}
      />
    </>
  );
}

export default AdminUsers;
