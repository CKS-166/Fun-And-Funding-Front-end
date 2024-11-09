import { useState, useEffect } from "react";
import reportApiInstance from "../../../utils/ApiInstance/reportApiInstance";
import { ToastContainer, toast } from "react-toastify";
import ReportTable from "../../../components/ReportTable";
import userApiInstace from "../../../utils/ApiInstance/userApiInstance";
import fundingProjectApiInstace from "../../../utils/ApiInstance/fundingProjectApiInstance";
import Cookies from "js-cookie";

const notify = (message, type) => {
  const options = {
    position: "top-right",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      backgroundColor: "#ffffff",
      color: "#000000",
      fontWeight: "bold",
    },
  };

  if (type === "warn") {
    toast.warn(message, options);
  } else if (type === "success") {
    toast.success(message, options);
  } else if (type === "error") {
    toast.error(message, options);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

function AdminReport() {
  const [dataLoad, setDataLoad] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10,
  });
  const [mappedData, setMappedData] = useState([]); // State to store the mapped data

  const fetchUserById = async (userId) => {
    try {
      const response = await userApiInstace.get(`/${userId}`);
      return response.data._data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjectById = async (projectId) => {
    try {
      const response = await fundingProjectApiInstace.get(`/${projectId}`);
      return response.data._data;
    } catch (error) {
      console.log(error);
    }
  };

  const updatePagination = (updates) => {
    setPagination((prev) => ({ ...prev, ...updates }));
  };

  const handlePageChange = (newPage) => {
    fetchReportList(newPage, pagination.pageSize);
  };

  const handlePageSizeChange = (newPageSize) => {
    updatePagination({ pageSize: newPageSize });
    fetchReportList(0, newPageSize);
  };

  const fetchReportList = async (
    page = pagination.currentPage,
    pageSize = pagination.pageSize
  ) => {
    try {
      const response = await reportApiInstance.get("", {
        params: {
          pageIndex: page + 1,
          pageSize: pageSize,
        },
      });
      const { items, totalItems, totalPages } = response.data._data;
      setDataLoad(items || []); // Ensure items is an array
      updatePagination({ totalItems, totalPages, currentPage: page });
      notify("Success fetching data", "success");
    } catch (error) {
      console.log(error);
      notify("Something went wrong", "error");
    }
  };

  useEffect(() => {
    fetchReportList();
  }, []);

  useEffect(() => {
    const mapData = async () => {
      const mapped = await Promise.all(
        (dataLoad || []).map(async (data) => {
          const project = await fetchProjectById(data.projectId);
          const user = await fetchUserById(data.reporterId);
          return {
            Id: data.id,
            reporterId: user ? user.userName : "Unknown",
            projectId: project ? project.name : "Unknown",
            content: data.content,
            isHandle: data.isHandle ? "Handled" : "Not handled",
            date: formatDate(data.date),
            fileUrls: data.fileUrls,
            faultCauses: data.faultCauses,
          };
        })
      );
      setMappedData(mapped); // Update the state with the mapped data
    };
    if (dataLoad.length > 0) {
      mapData();
    }
  }, [dataLoad]); // Re-run whenever dataLoad changes

  const handleRowClick = async (reportId) => {
    try {
      console.log(reportId);
      const token = Cookies.get("_auth");
      console.log(token);
      // Make sure the Authorization header is in the headers object
      const response = await reportApiInstance.patch(
        `?id=${reportId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log(data);
      if (data._isSuccess === true) {
        notify("Report has been handled", "success");
        fetchReportList();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold my-6 text-center text-[#1BAA64]">
        Admin Report
      </h1>
      <ReportTable
        data={mappedData} // Use the mapped data here
        handleRowClick={handleRowClick}
        totalItems={pagination.totalItems}
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      <ToastContainer />
    </>
  );
}

export default AdminReport;
