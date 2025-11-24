import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const api = import.meta.env.VITE_API_URL;

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${api}/api/job/all?keyword=${searchText}`);

        if (res.data.success) {
          dispatch(setAllJobs(res.data?.jobs || [])); 
        }
      } catch (error) {
        console.log(error);
        dispatch(setAllJobs([])); 
      }
    };

    fetchJobs();
  }, [searchText]); // FIXED DEPENDENCY
};

export default useGetAllJobs;
