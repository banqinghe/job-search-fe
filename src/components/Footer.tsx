import githubIconUrl from '@/assets/github-icon.svg';

interface FooterProps{
  className?: string;
  style?: React.CSSProperties;
}


function Footer(props: FooterProps) {
  const { className = '', style } = props;

  return (
    <footer
      style={style}
      className={'flex justify-between items-center h-14 px-6 text-xs text-gray-500 ' + className}
    >
      <div>© 2021 ECNU Advanced Programming</div>
      <a href="https://github.com/banqinghe/job-search-fe" target="_blank">
        <img src={githubIconUrl} alt="github icon" />
      </a>
    </footer>
  );
}

export default Footer;
