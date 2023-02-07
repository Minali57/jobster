import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";
import Wrapper from "../assets/wrappers/JobsContainer";
import Loading from "./Loading";
import { getAllJobs } from "../features/allJobs/allJobsSlice";

const JobContainer = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, searchStatus, searchType, sort]);
  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return <Wrapper>No jobs to display...</Wrapper>;
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobContainer;
