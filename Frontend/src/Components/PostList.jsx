import { useContext, useEffect, useState } from "react";
import PostCard from "./PostCard";
import { PostListContext } from "../Store/post-list-store";
import { UserContext } from "@/Store/user-store";
const PostList = () => {
  const { allJobs, searchedQuery } = useContext(UserContext);

  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);
  return (
    <>
      <div className="post-list-container">
        {filterJobs.length <= 0 ? (
          <span>Job Not Found</span>
        ) : (
          filterJobs.map((item, index) => (
            <PostCard key={index} item={item}></PostCard>
          ))
        )}
      </div>
    </>
  );
};
export default PostList;
