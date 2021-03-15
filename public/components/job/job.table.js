"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = JobTable;

var _job = _interopRequireDefault(require("./job.row"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function JobTable(props) {
  var jobRows = props.jobs.map(function (job) {
    return /*#__PURE__*/React.createElement(_job.default, {
      job: job,
      key: job._id
    });
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Personel"), /*#__PURE__*/React.createElement("th", null, "City"), /*#__PURE__*/React.createElement("th", null, "Address"), /*#__PURE__*/React.createElement("th", null, "Country"), /*#__PURE__*/React.createElement("th", null, "Company"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Start"), /*#__PURE__*/React.createElement("th", null, "End"))), /*#__PURE__*/React.createElement("tbody", null, jobRows));
}