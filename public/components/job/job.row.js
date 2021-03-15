"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = JobRow;

function JobRow(props) {
  var job = props.job;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, job.title), /*#__PURE__*/React.createElement("td", null, job.personel), /*#__PURE__*/React.createElement("td", null, job.location.city), /*#__PURE__*/React.createElement("td", null, job.location.address), /*#__PURE__*/React.createElement("td", null, job.location.country), /*#__PURE__*/React.createElement("td", null, job.company.name), /*#__PURE__*/React.createElement("td", null, job.status), /*#__PURE__*/React.createElement("td", null, job.start.toDateString()), /*#__PURE__*/React.createElement("td", null, job.end.toDateString()));
}