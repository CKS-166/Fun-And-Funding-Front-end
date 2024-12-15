import React, { useEffect, useState } from "react";
import { useLoading } from "../../../contexts/LoadingContext";
import marketplaceProjectApiInstace from "../../../utils/ApiInstance/marketplaceProjectApiInstance";
import MarketplaceProjectDetailModal from "./MarketplaceProjectDetailModal";

const projectStatus = {
  0: { name: "Deleted", color: "var(--red)" },
  1: { name: "Pending", color: "#FFC107" },
  2: { name: "Processing", color: "#2196F3" },
  3: { name: "Funded Successful", color: "var(--primary-green)" },
  4: { name: "Successful", color: "var(--primary-green)" },
  5: { name: "Failed", color: "var(--red)" },
  6: { name: "Rejected", color: "var(--red)" },
  7: { name: "Approved", color: "var(--primary-green)" },
  8: { name: "Withdrawed", color: "#9C27B0" },
  9: { name: "Refunded", color: "#FF5722" },
  10: { name: "Reported", color: "#E91E63" },
};

function AdminMarketplaceProject() {
  const { isLoading, setIsLoading } = useLoading();
  const [marketplaceProjectList, setMarketplaceProjectList] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMarketplaceProjectId, setSelectedMarketplaceProjectId] =
    useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchMarketplaceProjectList();
  }, [pageIndex, searchValue]);

  const fetchMarketplaceProjectList = async () => {
    try {
      setIsLoading(true);
      const res = await marketplaceProjectApiInstace.get(``, {
        params: {
          pageSize: 10,
          pageIndex: pageIndex,
          searchValue: searchValue,
        },
      });
      if (res.data._statusCode == 200) {
        setMarketplaceProjectList(res.data._data);
        setPageIndex(res.data._data.pageIndex);
        setTotalPage(res.data._data.totalPages);
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
    setSelectedMarketplaceProjectId(userId);
    setOpenModal(true);
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12 my-8">
        <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <span className="text-base font-normal text-gray-500">
                Showing total of{" "}
                <span className="font-semibold text-gray-900">
                  {marketplaceProjectList?.totalItems ?? "0"}{" "}
                </span>
                Marketplace Projects
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
                  <th scope="col" className="px-4 py-3 w-[12rem]">
                    Project Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Owner Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Created Date
                  </th>
                  <th scope="col" className="px-4 py-3 w-[8rem]">
                    Price
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
                {marketplaceProjectList.items &&
                  marketplaceProjectList.items.length > 0 &&
                  marketplaceProjectList.items.map((project, index) => (
                    <tr key={index} className="border-b">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 max-w-[12rem] overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {project.name}
                      </th>
                      <td className="px-4 py-3">{project.user?.userName}</td>
                      <td className="px-4 py-3">
                        {new Date(project.createdDate).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap">
                        {formatPrice(project.price)}{" "}
                        <span className="text-[0.75rem]">VND</span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded text-white`}
                          style={{
                            backgroundColor:
                              projectStatus[project.status]?.color || "#9E9E9E",
                          }}
                        >
                          {projectStatus[project.status]?.name || "Unknown"}
                        </span>
                      </td>

                      <td className="px-4 py-3 flex items-center justify-end">
                        <button
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none"
                          type="button"
                          onClick={() => handleOpenModal(project.id)}
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
          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <div></div>
            <ul className="inline-flex items-stretch -space-x-px list-none">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <MarketplaceProjectDetailModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedMarketplaceProjectId={selectedMarketplaceProjectId}
        fetchMarketplaceProjectList={fetchMarketplaceProjectList}
      />
    </>
  );
}

export default AdminMarketplaceProject;
