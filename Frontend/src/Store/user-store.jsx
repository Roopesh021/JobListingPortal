import {
  APPLICATION_API_END_POINT,
  COMPANY_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

const UserDetailsProvider = ({ children }) => {
  // Initialize state with null or the saved user data from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Persist user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Clear data when user logs out or becomes null
  useEffect(() => {
    if (user === null) {
      localStorage.removeItem("user");
      setAllJobs([]);
      localStorage.removeItem("allJobs");
      localStorage.removeItem("singleJob");
      setCompanies([]);
      localStorage.removeItem("companies");
      setAllAdminJobs([]);
      localStorage.removeItem("allAdminJobs");
      localStorage.removeItem("applicants");
      localStorage.removeItem("allAppliedJobs");
    }
  }, [user]);

  // Handler to update the user and persist it
  const userHandler = (data) => {
    setUser(data);
    localStorage.removeItem("user");
    console.log("User updated:", data);
  };

  //Getting all companies

  const [companies, setCompanies] = useState(() => {
    const savedCompanies = localStorage.getItem("companies");
    return savedCompanies ? JSON.parse(savedCompanies) : [];
  });

  // const [companies, setCompanies] = useState([]);

  const useGetAllCompanies = () => {
    useEffect(() => {
      if (companies.length === 0) {
        const fetchCompanies = async () => {
          try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
              withCredentials: true,
            });
            if (res.data.success) {
              setCompanies(res.data.companies);
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchCompanies();
      }
    }, [companies]);

    useEffect(() => {
      if (companies.length > 0) {
        localStorage.setItem("companies", JSON.stringify(companies));
      }
    }, [companies]);
  };

  // Searching Companies
  const [searchCompanyByText, setSearchCompanyByText] = useState("");

  // Get Admin Jobs
  const [allAdminJobs, setAllAdminJobs] = useState(() => {
    const savedAdminJobs = localStorage.getItem("allAdminJobs");
    return savedAdminJobs ? JSON.parse(savedAdminJobs) : [];
  });

  const useGetAllAdminJobs = () => {
    useEffect(() => {
      if (allAdminJobs.length === 0) {
        const fetchAllAdminJobs = async () => {
          try {
            const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
              withCredentials: true,
            });
            if (res.data.success) {
              setAllAdminJobs(res.data.jobs);
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchAllAdminJobs();
      }
    }, [allAdminJobs]);

    useEffect(() => {
      if (allAdminJobs.length > 0) {
        localStorage.setItem("allAdminJobs", JSON.stringify(allAdminJobs));
      }
    }, [allAdminJobs]);
  };

  // Searching AdminJobs
  const [searchJobsByText, setSearchJobsByText] = useState("");

  //Search Queery

  // const [searchedQuery, setSearchedQuery] = useState("");

  //Getting All Jobs

  const [allJobs, setAllJobs] = useState(() => {
    const savedJobs = localStorage.getItem("allJobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const useGetAllJobs = () => {
    useEffect(() => {
      if (allJobs.length === 0) {
        const fetchAllJobs = async () => {
          try {
            const res = await axios.get(`${JOB_API_END_POINT}/get`, {
              withCredentials: true,
            });
            if (res.data.success) {
              setAllJobs(res.data.jobs);
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchAllJobs();
      }
    }, [allJobs]);

    useEffect(() => {
      if (allJobs.length > 0) {
        localStorage.setItem("allJobs", JSON.stringify(allJobs));
      }
    }, [allJobs]);
  };

  //Getting Single Job By Id

  const [singleJob, setSingleJob] = useState(() => {
    const savedSingleJob = localStorage.getItem("singleJob");
    return savedSingleJob ? JSON.parse(savedSingleJob) : null;
  });
  useEffect(() => {
    if (singleJob) {
      localStorage.setItem("singleJob", JSON.stringify(singleJob));
    }
  }, [singleJob]);

  // Applicants

  const [applicants, setApplicants] = useState([]);

  // Getting AllAppliedJobs

  const [allAppliedJobs, setAllAppliedJobs] = useState(() => {
    const savedAppliedJobs = localStorage.getItem("allAppliedJobs");
    return savedAppliedJobs ? JSON.parse(savedAppliedJobs) : [];
  });

  const useGetAppliedJobs = () => {
    useEffect(() => {
      if (allAppliedJobs.length === 0) {
        const fetchAppliedJobs = async () => {
          try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
              withCredentials: true,
            });
            if (res.data.success) {
              setAllAppliedJobs(res.data.application);
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchAppliedJobs();
      }
    }, [allAppliedJobs]);

    useEffect(() => {
      if (allAppliedJobs.length > 0) {
        localStorage.setItem("allAppliedJobs", JSON.stringify(allAppliedJobs));
      }
    }, [allAppliedJobs]);
  };

  // Filter Logic

  const [searchedQuery, setSearchedQuery] = useState();

  // Provide user data and handler to the children
  return (
    <UserContext.Provider
      value={{
        user,
        userHandler,
        companies,
        useGetAllCompanies,
        searchCompanyByText,
        setSearchCompanyByText,
        allAdminJobs,
        useGetAllAdminJobs,
        searchJobsByText,
        setSearchJobsByText,
        allJobs,
        useGetAllJobs,
        singleJob,
        setSingleJob,
        applicants,
        setApplicants,
        allAppliedJobs,
        useGetAppliedJobs,
        searchedQuery,
        setSearchedQuery,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserDetailsProvider;
