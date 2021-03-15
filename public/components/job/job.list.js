"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlFetch = _interopRequireDefault(require("./utils/graphqlFetch"));

var _job = _interopRequireDefault(require("./job.filter"));

var _job2 = _interopRequireDefault(require("./job.table"));

var _job3 = _interopRequireDefault(require("./job.add"));

var _skill = _interopRequireDefault(require("./skill.list"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var JobList = /*#__PURE__*/function (_React$Component) {
  _inherits(JobList, _React$Component);

  var _super = _createSuper(JobList);

  function JobList() {
    var _this;

    _classCallCheck(this, JobList);

    _this = _super.call(this);
    _this.state = {
      jobs: [],
      companies: []
    };
    _this.createJob = _this.createJob.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(JobList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
      this.loadCompany();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "\n      query {\n        job {\n          _id\n          personel\n          representative { name _id cid email phone}\n          location { country address postcode city cid _id}\n          title\n          company {name}\n          status\n          start\n          end\n        }\n      }\n      ";
                _context.next = 3;
                return (0, _graphqlFetch.default)(query);

              case 3:
                data = _context.sent;

                if (data) {
                  this.setState({
                    jobs: data.job
                  });
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "loadCompany",
    value: function () {
      var _loadCompany = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "query {\n        company {\n          _id\n          name\n        }\n      }";
                _context2.next = 3;
                return (0, _graphqlFetch.default)(query);

              case 3:
                data = _context2.sent;

                if (data) {
                  this.setState({
                    companies: data.company
                  });
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadCompany() {
        return _loadCompany.apply(this, arguments);
      }

      return loadCompany;
    }()
  }, {
    key: "createJob",
    value: function () {
      var _createJob = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(job) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "mutation addNewJob($job: JobInput!) { jobAdd(job: $job) {title, _id}} ";
                _context3.next = 3;
                return (0, _graphqlFetch.default)(query, {
                  job: job
                });

              case 3:
                data = _context3.sent;

                if (data) {
                  this.loadData();
                }

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createJob(_x) {
        return _createJob.apply(this, arguments);
      }

      return createJob;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Job Tracker"), /*#__PURE__*/React.createElement(_job.default, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(_job2.default, {
        jobs: this.state.jobs
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(_job3.default, {
        createJob: this.createJob,
        comp: this.state.companies
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(_skill.default, null));
    }
  }]);

  return JobList;
}(React.Component);

exports.default = JobList;