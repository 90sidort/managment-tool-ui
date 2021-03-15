"use strict";

var _job = _interopRequireDefault(require("./components/job/job.list"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var element = /*#__PURE__*/React.createElement(_job.default, null);
ReactDOM.render(element, document.getElementById('contents'));