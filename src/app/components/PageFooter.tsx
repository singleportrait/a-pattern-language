import cx from 'classnames';

type PageFooterProps = {
  label: string;
  classNames: string;
};

const PageFooter = ({ label, classNames }: PageFooterProps) => {
  return (
    <div
      className={cx({
        'w-full flex items-center gap-x-4 py-8': true,
        [classNames]: !!classNames,
      })}
    >
      <div className="grow border-b-2 border-b-accent" />
      <p className="font-number">{label}</p>
      <div className="grow border-b-2 border-b-accent" />
    </div>
  );
};

export default PageFooter;
