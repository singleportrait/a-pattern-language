"use client";

import Sidebar from "@/app/components/Sidebar";

// type PatternsSidebarProps = {};

const PatternsSidebarContents = () => {
  return <div>Pattern</div>;
};

const PatternsSidebar = () => {
  return (
    <Sidebar title="Index" renderContent={() => <PatternsSidebarContents />} />
  );
};

export default PatternsSidebar;
