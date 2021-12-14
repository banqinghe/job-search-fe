import { JobRecord } from '@/models';
import React from 'react';

interface JobRecordCardProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  record: JobRecord;
}

/**
 * 投递记录展示卡片
 */
function JobRecordCard(props: JobRecordCardProps) {
  const {
    className = '',
    style,
    onClick,
    record,
  } = props;

  const hasBeenRead = record.status === 'read';

  return (
    <div
      className={className + ' p-6 rounded-md border border-gray-100'}
      style={style}
      onClick={onClick ?? (() => console.log('Click Record Card'))}
    >
      <div>
        <div className="flex justify-between mb-2.5">
          <h2 className="text-xl font-bold">{record.title}</h2>
          <div className="text-gray-500 self-start">投递时间: {record.sendTime}</div>
        </div>
        <div className="text-gray-500">
          <span>{record.company} - {record.department}</span>
          <span className="mx-2.5">|</span>
          <span>
            {Array.isArray(record.location) ? record.location.join('/') : record.location}
          </span>
          <span className="mx-2.5">|</span>
          <span>发布于 {record.postTime}</span>
        </div>
      </div>
      <hr className="mt-5 mb-4 border-gray-200" />
      <div>
        <span className={
          'inline-block px-2 py-1 rounded text-xs opacity-70 ' +
          (hasBeenRead ? 'bg-blue-100 text-blue-500' : 'bg-gray-400 text-white')
        }>
          {hasBeenRead ? '已被查看' : '未被查看'}
        </span>
      </div>
    </div>
  );
}

export default JobRecordCard;
