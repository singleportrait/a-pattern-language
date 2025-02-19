const linkClasses = 'px-5 tracking-wide underline underline-offset-2 flex items-center';

const Footer = () => {
  return (
    <div className="bg-accent-200 w-full flex justify-between text-sm h-10.5 items-stretch">
      <a href="mailto:jenn@jennscheer.com?subject=A Pattern Language Index" className={linkClasses}>
        Email
      </a>
      <a href="https://github.com/singleportrait/a-pattern-language" className={linkClasses}>
        Github
      </a>
    </div>
  );
};

export default Footer;
