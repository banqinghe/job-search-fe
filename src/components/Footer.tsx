import githubIconUrl from '@/assets/github-icon.svg';

function Footer() {
  return (
    <footer className="flex justify-between items-center h-14 px-6 text-xs text-gray-500">
      <div>© 2021 ECNU Advanced Programming</div>
      <a href="https://github.com/banqinghe/job-search-fe" target="_blank">
        <img src={githubIconUrl} alt="github icon" />
      </a>
    </footer>
  );
}

export default Footer;
