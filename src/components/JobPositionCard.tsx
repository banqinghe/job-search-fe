import React from 'react';
import { useNavigate } from 'react-router-dom';
import { JobPosition } from "@/models";

interface JobPositionCardProps {
  className?: string;
  style?: React.CSSProperties;
  jobInfo: JobPosition;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
} 

function JobPositionCard(props: JobPositionCardProps) {
  const {
    className = '',
    style,
    jobInfo,
    onClick,
  } = props;

  const navigate = useNavigate();

  return (
    <div
      className={className + 
        ' flex px-6 py-4 rounded-md border border-gray-100 hover:shadow transition-shadow'
      }
      style={style}
      // TODO: 点击跳转至相应职位详细页
      onClick={onClick ?? (() => console.log('Click Job Card'))}
      // onClick={onClick ?? (() => navigate(`/jobs/${jobInfo.id}`))}
    >
      {/* 职位信息 */}
      <div className="flex-1">
        <h2 className="text-xl mb-0.5">
          {jobInfo.title}
        </h2>
        <p className="text-blue-500 text-lg font-bold mb-1">
          {jobInfo.salaryRange[0]}k - {jobInfo.salaryRange[1]}k
        </p>
        <p className="space-x-1 mb-1">
          <span>{Array.isArray(jobInfo.location) ? jobInfo.location.join('、') : jobInfo.location} /</span>
          <span>{jobInfo.experienceRequirement ?? '经验不限'} /</span>
          <span>{jobInfo.educationRequirement ?? '学历不限'}</span>
        </p>
        <p className="text-xs text-gray-500">发布于 {jobInfo.postTime}</p>
      </div>

      {/* 公司信息 */}
      <div className="flex items-center">
        <div className="self-start pt-2 text-gray-600" style={{ minWidth: 80 }}>
          <p className="mb-2 text-base">{jobInfo.company}</p>
          <p className="text-xs">{jobInfo.department}</p>
        </div>
        <img className="w-24 h-24 border border-gray-100" src={jobInfo.logoUrl} alt={jobInfo.company + ' logo'} />
      </div>
    </div>
  );
}

export default JobPositionCard;
