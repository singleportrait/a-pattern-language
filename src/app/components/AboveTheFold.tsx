'use client';

import Image from 'next/image';

import PageBorder from '@/app/components/PageFooter';

import diagram6 from '@public/above-the-fold/diagram_6.png';
import diagram21 from '@public/above-the-fold/diagram_21.png';
import diagram137 from '@public/above-the-fold/diagram_137.png';

const AboveTheFold = () => {
  return (
    <div className="w-full">
      <div className="h-above_the_fold bg-accent-200 px-3 flex flex-col justify-between items-center -mx-5 -mt-5 -mb-4 overflow-hidden">
        <div className="w-full">
          <div className="content_grid w-full">
            <PageBorder
              label="a guide to the seminal architecture book"
              classNames="content_grid_span_8 !py-5"
              borderColor="border-b-black"
            />
          </div>

          <div className="flex md:justify-between items-center md:px-8 lg:px-[5vw]">
            <Image
              src={diagram21}
              alt="Diagram for pattern 21"
              className="hidden md:block h-[8.5vh] sm:h-[8.5vh] lg:h-[9.5vh] w-auto mix-blend-multiply"
            />
            <Image
              src={diagram6}
              alt="Diagram for pattern 6"
              className="mix-blend-multiply h-28 sm:h-[18vh] lg:h-[20vh] w-auto -ml-12 md:ml-0"
              width={243}
              height={154}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-8 sm:gap-y-12 xl:gap-y-4 sm:items-center pb-8 md:pb-4">
          <h1 className="font-serif text-[72px] xs:text-[90px] sm:text-[120px] md:text-[130px] lg:text-[130px] xl:text-[140px] leading-[80%] text-center">
            A Pattern <br className="xl:hidden" />
            Language
          </h1>

          <div className="relative xl:-left-32 text-sm xs:text-base">
            <ul className="flex flex-col sm:flex-row sm:gap-6 uppercase">
              <li>Christopher Alexander</li>
              <li>Sara Ishikawa</li>
              <li>Murray Silverstein</li>
            </ul>
            <ul className="flex flex-col sm:flex-row sm:gap-4">
              <li>with</li>
              <li>Max Jacobson</li>
              <li>Ingrid Fiksdahl-King</li>
              <li>Shlomo Angel</li>
            </ul>
          </div>
        </div>

        <div className="w-full space-y-2">
          <div className="flex justify-end md:justify-center items-center">
            <Image
              src={diagram137}
              alt="Diagram for pattern 137"
              className="hidden md:block relative left-[15%] h-[19vh] xl:h-[25vh] w-auto mix-blend-multiply"
            />
            <Image
              src={diagram21}
              alt="Diagram for pattern 21"
              className="md:hidden mix-blend-multiply h-[8.5vh] md:h-[9vh] w-auto -mr-6"
            />
          </div>

          <div className="content_grid w-full">
            <PageBorder
              label="published in 1977"
              classNames="content_grid_span_8 !py-5"
              borderColor="border-b-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboveTheFold;
