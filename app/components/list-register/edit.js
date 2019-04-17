import React from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {
  id: string,
  editRoute: string
};

const EditAction = ({ id, editRoute }: Props) => (
  <div className="tb-icons tb-edit-icon">
    <OverlayTrigger overlay={<Tooltip id="tb-edit-tooltip">Edit</Tooltip>}>
      <Link to={`${editRoute}/${id}`}>
        <span className="tb-tooltip-btn">
          <span className="fal fa-edit" />
        </span>
      </Link>
    </OverlayTrigger>
  </div>
);

export default EditAction;
