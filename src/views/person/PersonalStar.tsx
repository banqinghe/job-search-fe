import JobPositionCard from "@/components/JobPositionCard";
import { JobPositionJobHunterDetail } from "@/models";
import { useEffect, useState } from "react";
import service from "@/service";
import { GlobalState, UserInfoState } from '@/store/state';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


function PersonalStar() {
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);
  const navigate = useNavigate();
  const [jobList, setJobList] = useState<JobPositionJobHunterDetail[]>([]);

  useEffect(() => {
    service
      .userGetAllCollectedJobs({ username: userInfo.username })
      .then(res => {
        setJobList(res.data);
      })
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 px-8 py-8">
      {jobList.map(jobInfo => (
        <JobPositionCard key={jobInfo.id} jobInfo={jobInfo} onClick={() => navigate(`/job/${jobInfo.id}`)} />
      ))}
    </div>
  );
}

export default PersonalStar;
