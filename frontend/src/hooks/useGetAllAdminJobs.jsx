import { setAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const api = import.meta.env.VITE_API_URL;

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${api}/api/job/getadminjobs`);

        if (res.data.success) {
          dispatch(setAdminJobs(res.data?.jobs || [])); // SAFE FALLBACK
        }
      } catch (error) {
        console.log(error);
        dispatch(setAdminJobs([])); // prevent crash if API fails
      }
    };

    fetchAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;
