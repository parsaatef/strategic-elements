import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Routes from '../Routes';

const FullPageLayout = () => (
      <>
        <Scrollbars className="container-fluid smfp-Custom-scrollbar-container">
          <Routes />
        </Scrollbars>
      </>
);

export default FullPageLayout;
