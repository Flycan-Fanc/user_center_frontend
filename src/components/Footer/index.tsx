import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = 'Flycan';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'jianshu',
          title: '博客-简书',
          href: 'https://www.jianshu.com/u/86c355ed355e',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Flycan-Fanc',
          blankTarget: true,
        },
        {
          key: 'page',
          title: '个人网址',
          href: 'https://flycan-fanc.github.io/',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
