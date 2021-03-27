import React from 'react'
import { Tooltip } from "react-bootstrap";

export default CloseTooltip = (text) => (
    <Tooltip id="close-tooltip" placement="top">{text}</Tooltip>
  );