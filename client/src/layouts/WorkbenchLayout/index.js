import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const WorkbenchLayout = ({ children }) => (
  <div className="workbench-layout">
    <Header />
    {children}
    <Footer />
  </div>
);

export default WorkbenchLayout;
