import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  link: string,
  icon: string,
  title: string,
  className: string
};

const PanelItem = ({ className, link, icon, title }: Props) => (
  <div className={`panel-item-container ${className}`}>
    <Link className="smfp-main-item-wrap" to={link}>
      <div className="img">
        <img src={icon} alt="img" />
      </div>
      <div className="title">
        <h2>{title}</h2>
      </div>
    </Link>
  </div>
);

export default PanelItem;
