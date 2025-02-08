import cx from 'classnames';

type PageFooterProps = {
  label: string;
  classNames?: string;
  borderColor?: string;
};

const PageBorder = ({
  label,
  classNames = '',
  borderColor = 'border-b-accent-200',
}: PageFooterProps) => {
  return (
    <div
      className={cx({
        'w-full flex items-center gap-x-3.5 py-8': true,
        [classNames]: !!classNames,
      })}
    >
      <div className={`grow border-b-2 ${borderColor}`} />
      <p className="font-serif">{label}</p>
      <div className={`grow border-b-2 ${borderColor}`} />
    </div>
  );
};

export default PageBorder;
