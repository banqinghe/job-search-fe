import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobRecord } from '@/models';
import { GlobalState, UserInfoState } from '@/store/state';
import JobRecordCard from '@/components/JobRecordCard';
import { useSelector } from 'react-redux';
import service from '@/service';

function PersonalRecords() {
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);
  const [jobRecordList, setJobRecordList] = useState<JobRecord[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    service
      .userGetAllResumeRecord({ username: userInfo.username })
      .then(res => {
        setJobRecordList(res.data);
      });
  }, []);

  return (
    <div className="p-8 space-y-6">
      {jobRecordList.map(record => (
        <JobRecordCard key={record.id} record={record} onClick={() => navigate(`/job/${record.id}`)}  />
      ))}
    </div>
  );
}

export default PersonalRecords;
