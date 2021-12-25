import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Company, JobPosition } from "@/models";
import { Tooltip } from 'antd';

interface CompanyCardProps {
  className?: string;
  style?: React.CSSProperties;
  companyInfo: Company;
  CardClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  JobClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  ResumeClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
} 

function CompanyCard(props: CompanyCardProps) {
  const {
    className = '',
    style,
    companyInfo,
    CardClick,
    JobClick,
    ResumeClick
  } = props;

  
  return (
    <div
      className={className + 
        ' flex flex-col px-6 py-4 rounded-md border border-gray-100 divide-y divide-dotted divide-gray-300 hover:shadow transition-shadow'
      }
      style={style}
    >
      <div className="flex flex-col items-center cursor-pointer"
        // TODO: 点击跳转至相应公司详情页
        onClick={CardClick ?? (() => console.log('Click Company Card'))}
      >
        <img className="w-24 h-24" src={companyInfo.logoUrl} alt={companyInfo.name + ' logo'} />
        <h2 className="text-lg mt-2">
          {companyInfo.name}
        </h2>
        <p className="space-x-1 mt-2 text-gray-500">
          {Array.isArray(companyInfo.location) ? companyInfo.location.join('、') : companyInfo.location}
        </p>
        <Tooltip title={companyInfo.description}>
          <span className="truncate w-full mt-2 mb-5">{companyInfo.description}</span>
        </Tooltip>
      </div>
      <div className="flex divide-x divide-dotted divide-gray-200">
        <div className="flex-1 flex-col cursor-pointer"
          onClick={JobClick ?? (() => console.log('Click JobNumber'))}
        >
          <p className="text-center m-2 text-green-500">
            {companyInfo.jobNumber}
          </p>
          <p className="text-center hover:text-green-500">
            在招职位
          </p>
        </div>
        <div className="flex-1 flex-col cursor-pointer"
          onClick={ResumeClick ?? (() => console.log('Click ResumeNumber'))}
        >
          <p className="text-center m-2 text-green-500">
            {companyInfo.resumeNumber}
          </p>
          <p className="text-center hover:text-green-500">
            已收简历
          </p>
        </div>
      </div>
      
      {/* <div className="flex-1">
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
      </div> */}

      {/* 公司信息 */}
      {/* <div className="flex items-center">
        <div className="self-start pt-2 text-gray-600" style={{ minWidth: 80 }}>
          <p className="mb-2 text-base">{jobInfo.company}</p>
          <p className="text-xs">{jobInfo.department}</p>
        </div>
        <img className="w-24 h-24 border border-gray-100" src={jobInfo.logoUrl} alt={jobInfo.company + ' logo'} />
      </div> */}
    </div>
  );
}

export default CompanyCard;
