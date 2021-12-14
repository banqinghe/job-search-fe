import { JobRecord } from '@/models';
import JobRecordCard from '@/components/JobRecordCard';

// Mock Job Record
import MockJobRecord from '@/mock/company/job-record.json';

function PersonalRecords() {
  return (
    <div className="p-8 space-y-6">
      {(MockJobRecord as JobRecord[]).map(record => (
        <JobRecordCard key={record.id} record={record}  />
      ))}
    </div>
  );
}

export default PersonalRecords;
