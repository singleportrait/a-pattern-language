import Menu from '@/app/components/Menu';

type Props = {
  children: React.ReactNode;
};

export default async function SiteLayout(props: Props) {
  return (
    <>
      <Menu />
      {props.children}
    </>
  );
}
