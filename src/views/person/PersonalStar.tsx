import JobPositionCard from "@/components/JobPositionCard";
import { JobPosition } from "@/models";

// Mock recommend job position
import MockRecommendJobs from '@/mock/company/recommend-job-position.json';

function PersonalStar() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 px-8 py-8">
      {(MockRecommendJobs as JobPosition[]).map(jobInfo => (
        <JobPositionCard key={jobInfo.id} jobInfo={jobInfo} />
      ))}
    </div>
  );
}

export default PersonalStar;
