"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var initialJobs = [{
  id: 1,
  personel: 10,
  location: {
    id: 1,
    city: 'Gorzów Wielkopolski',
    address: 'Powstancow Slaskich 20',
    country: 'Poland',
    postcode: '66-400'
  },
  title: '10 zbieraczy jabłek',
  company: {
    id: 1,
    name: 'Jabłex'
  },
  start: '2021-03-01',
  end: '2021-03-31',
  status: 'New'
}, {
  id: 2,
  personel: 1,
  location: {
    id: 1,
    city: 'Gorzów Wielkopolski',
    address: 'Powstancow Slaskich 20',
    country: 'Poland',
    postcode: '66-400'
  },
  title: '1 kierownik zbierania jabłek',
  company: {
    id: 1,
    name: 'Jabłex'
  },
  start: '2021-03-01',
  end: '2021-03-31',
  status: 'New'
}];
var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

var JobsFilter = /*#__PURE__*/function (_React$Component) {
  _inherits(JobsFilter, _React$Component);

  var _super = _createSuper(JobsFilter);

  function JobsFilter() {
    _classCallCheck(this, JobsFilter);

    return _super.apply(this, arguments);
  }

  _createClass(JobsFilter, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the jobs filter.");
    }
  }]);

  return JobsFilter;
}(React.Component);

function JobRow(props) {
  var job = props.job;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, job.title), /*#__PURE__*/React.createElement("td", null, job.personel), /*#__PURE__*/React.createElement("td", null, job.location.city), /*#__PURE__*/React.createElement("td", null, job.location.address), /*#__PURE__*/React.createElement("td", null, job.location.country), /*#__PURE__*/React.createElement("td", null, job.company.name), /*#__PURE__*/React.createElement("td", null, job.status), /*#__PURE__*/React.createElement("td", null, job.start.toDateString()), /*#__PURE__*/React.createElement("td", null, job.end.toDateString()));
}

function JobTable(props) {
  var jobRows = props.jobs.map(function (job) {
    return /*#__PURE__*/React.createElement(JobRow, {
      job: job,
      key: job._id
    });
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Personel"), /*#__PURE__*/React.createElement("th", null, "City"), /*#__PURE__*/React.createElement("th", null, "Address"), /*#__PURE__*/React.createElement("th", null, "Country"), /*#__PURE__*/React.createElement("th", null, "Company"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Start"), /*#__PURE__*/React.createElement("th", null, "End"))), /*#__PURE__*/React.createElement("tbody", null, jobRows));
}

var JobAdd = /*#__PURE__*/function (_React$Component2) {
  _inherits(JobAdd, _React$Component2);

  var _super2 = _createSuper(JobAdd);

  function JobAdd() {
    var _this;

    _classCallCheck(this, JobAdd);

    _this = _super2.call(this);
    _this.state = {
      companyValue: -1,
      representatives: [],
      locations: []
    };
    _this.onSubmitHandler = _this.onSubmitHandler.bind(_assertThisInitialized(_this));
    _this.onCompanySelectedHandler = _this.onCompanySelectedHandler.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(JobAdd, [{
    key: "loadRep",
    value: function () {
      var _loadRep = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cid) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query getRep($cid: ID) {\n      representative(cid: $cid) {\n        _id\n        cid\n        email\n        phone\n        name\n      }\n    }";
                _context.next = 3;
                return graphQLFetch(query, {
                  cid: cid
                });

              case 3:
                data = _context.sent;

                if (data) {
                  this.setState({
                    representatives: data.representative
                  });
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadRep(_x) {
        return _loadRep.apply(this, arguments);
      }

      return loadRep;
    }()
  }, {
    key: "loadLoc",
    value: function () {
      var _loadLoc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(cid) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "query getLocations($cid: ID) {\n      location(cid: $cid) {\n        _id\n        cid\n        city\n        country\n        address\n        postcode\n      }\n    }";
                _context2.next = 3;
                return graphQLFetch(query, {
                  cid: cid
                });

              case 3:
                data = _context2.sent;

                if (data) {
                  this.setState({
                    locations: data.location
                  });
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadLoc(_x2) {
        return _loadLoc.apply(this, arguments);
      }

      return loadLoc;
    }()
  }, {
    key: "createRepItems",
    value: function createRepItems() {
      var options = [];
      var reps = this.state.representatives;

      for (var i = 0; i < reps.length; i++) {
        options.push( /*#__PURE__*/React.createElement("option", {
          key: i,
          value: reps[i]._id
        }, reps[i].name, ", ", reps[i].email));
      }

      return options;
    }
  }, {
    key: "createLocItems",
    value: function createLocItems() {
      var options = [];
      var locs = this.state.locations;

      for (var i = 0; i < locs.length; i++) {
        options.push( /*#__PURE__*/React.createElement("option", {
          key: i,
          value: locs[i]._id
        }, locs[i].city, ", ", locs[i].country, ", ", locs[i].address, ", ", locs[i].postcode));
      }

      return options;
    }
  }, {
    key: "createCompItems",
    value: function createCompItems() {
      var options = [];
      var comps = this.props.comp;

      for (var i = 0; i < comps.length; i++) {
        options.push( /*#__PURE__*/React.createElement("option", {
          key: i,
          value: comps[i]._id
        }, comps[i].name));
      }

      options.push( /*#__PURE__*/React.createElement("option", {
        key: -1,
        value: -1,
        disabled: true
      }, "Select company"));
      return options;
    }
  }, {
    key: "onCompanySelectedHandler",
    value: function onCompanySelectedHandler(e) {
      this.loadRep(e.target.value);
      this.loadLoc(e.target.value);
      this.setState({
        companyValue: parseInt(e.target.value)
      });
    }
  }, {
    key: "onSubmitHandler",
    value: function onSubmitHandler(e) {
      e.preventDefault();
      var form = document.forms.jobAdd;
      var company = document.getElementById('company');
      var job = {
        title: form.title.value,
        personel: parseInt(form.personel.value),
        rate: parseFloat(form.rate.value),
        description: form.description.value,
        currency: form.currency.value,
        representative: form.representative.value,
        location: form.location.value,
        company: company.value,
        start: new Date(form.start.value),
        end: new Date(form.end.value),
        created: new Date(),
        status: 'New'
      };
      this.props.createJob(job); // form.assignee.value = "";
      // form.title.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Select company to add job"), /*#__PURE__*/React.createElement("select", {
        name: "company",
        id: "company",
        defaultValue: -1,
        onChange: this.onCompanySelectedHandler
      }, this.createCompItems())), this.state.companyValue !== -1 && /*#__PURE__*/React.createElement("form", {
        name: "jobAdd",
        onSubmit: this.onSubmitHandler
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "title",
        placeholder: "Title"
      }), /*#__PURE__*/React.createElement("input", {
        type: "number",
        name: "personel",
        placeholder: "Personel",
        step: "1"
      }), /*#__PURE__*/React.createElement("input", {
        type: "number",
        name: "rate",
        placeholder: "Rate",
        step: "0.01"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "description",
        placeholder: "Description"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "currency",
        placeholder: "Currency"
      }), /*#__PURE__*/React.createElement("select", {
        name: "representative"
      }, this.createRepItems()), /*#__PURE__*/React.createElement("select", {
        name: "location"
      }, this.createLocItems()), /*#__PURE__*/React.createElement("input", {
        type: "date",
        name: "start"
      }), /*#__PURE__*/React.createElement("input", {
        type: "date",
        name: "end"
      }), /*#__PURE__*/React.createElement("button", null, "Add")));
    }
  }]);

  return JobAdd;
}(React.Component);

function graphQLFetch(_x3) {
  return _graphQLFetch.apply(this, arguments);
}

function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(query) {
    var variables,
        response,
        body,
        result,
        error,
        details,
        _args8 = arguments;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            variables = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
            _context8.prev = 1;
            _context8.next = 4;
            return fetch(window.ENV.UI_API_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });

          case 4:
            response = _context8.sent;
            _context8.next = 7;
            return response.text();

          case 7:
            body = _context8.sent;
            result = JSON.parse(body, jsonDateReviver);

            if (result.errors) {
              error = result.errors[0];

              if (error.extensions.code == 'BAD_USER_INPUT') {
                details = error.extensions.exception.errors.join('\n ');
                alert("".concat(error.message, ":\n ").concat(details));
              } else {
                alert("".concat(error.extensions.code, ": ").concat(error.message));
              }
            }

            return _context8.abrupt("return", result.data);

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](1);
            alert("Error in sending data to server: ".concat(_context8.t0.message));

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 13]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

var SkillAdd = /*#__PURE__*/function (_React$Component3) {
  _inherits(SkillAdd, _React$Component3);

  var _super3 = _createSuper(SkillAdd);

  function SkillAdd() {
    var _this2;

    _classCallCheck(this, SkillAdd);

    _this2 = _super3.call(this);
    _this2.onSkillSubmitHandler = _this2.onSkillSubmitHandler.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(SkillAdd, [{
    key: "onSkillSubmitHandler",
    value: function onSkillSubmitHandler(e) {
      e.preventDefault();
      var form = document.forms.skillAdd;
      var skill = {
        name: form.name.value
      };
      this.props.createSkill(skill);
      form.name.value = '';
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "skillAdd",
        onSubmit: this.onSkillSubmitHandler
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "skill"
      }), /*#__PURE__*/React.createElement("button", null, "Add skill"));
    }
  }]);

  return SkillAdd;
}(React.Component);

var SkillList = /*#__PURE__*/function (_React$Component4) {
  _inherits(SkillList, _React$Component4);

  var _super4 = _createSuper(SkillList);

  function SkillList() {
    var _this3;

    _classCallCheck(this, SkillList);

    _this3 = _super4.call(this);
    _this3.state = {
      skills: []
    };
    _this3.createSkill = _this3.createSkill.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(SkillList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadSkills();
    }
  }, {
    key: "loadSkills",
    value: function () {
      var _loadSkills = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var query, response, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "query {\n      skill {\n        _id\n        name\n      }\n    }";
                _context3.next = 3;
                return fetch(window.ENV.UI_API_ENDPOINT, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query
                  })
                });

              case 3:
                response = _context3.sent;
                _context3.next = 6;
                return response.json();

              case 6:
                result = _context3.sent;
                this.setState({
                  skills: result.data.skill
                });

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadSkills() {
        return _loadSkills.apply(this, arguments);
      }

      return loadSkills;
    }()
  }, {
    key: "createSkill",
    value: function () {
      var _createSkill = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(skill) {
        var query, response, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = "mutation addNewSkill($skill: SkillInput!) { skillAdd(skill: $skill) {name _id}} ";
                _context4.next = 3;
                return fetch(window.ENV.UI_API_ENDPOINT, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: {
                      skill: skill
                    }
                  })
                });

              case 3:
                response = _context4.sent;
                _context4.next = 6;
                return response.json();

              case 6:
                result = _context4.sent;
                this.loadSkills();

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function createSkill(_x4) {
        return _createSkill.apply(this, arguments);
      }

      return createSkill;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Skills"), /*#__PURE__*/React.createElement("ul", null, this.state.skills.map(function (skill) {
        return /*#__PURE__*/React.createElement("li", {
          key: skill._id
        }, skill.name);
      })), /*#__PURE__*/React.createElement(SkillAdd, {
        createSkill: this.createSkill
      }));
    }
  }]);

  return SkillList;
}(React.Component);

var JobList = /*#__PURE__*/function (_React$Component5) {
  _inherits(JobList, _React$Component5);

  var _super5 = _createSuper(JobList);

  function JobList() {
    var _this4;

    _classCallCheck(this, JobList);

    _this4 = _super5.call(this);
    _this4.state = {
      jobs: [],
      companies: []
    };
    _this4.createJob = _this4.createJob.bind(_assertThisInitialized(_this4));
    return _this4;
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
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                query = "\n    query {\n      job {\n        _id\n        personel\n        representative { name _id cid email phone}\n        location { country address postcode city cid _id}\n        title\n        company {name}\n        status\n        start\n        end\n      }\n    }\n    ";
                _context5.next = 3;
                return graphQLFetch(query);

              case 3:
                data = _context5.sent;

                if (data) {
                  this.setState({
                    jobs: data.job
                  });
                }

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "loadCompany",
    value: function () {
      var _loadCompany = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                query = "query {\n      company {\n        _id\n        name\n      }\n    }";
                _context6.next = 3;
                return graphQLFetch(query);

              case 3:
                data = _context6.sent;

                if (data) {
                  this.setState({
                    companies: data.company
                  });
                }

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function loadCompany() {
        return _loadCompany.apply(this, arguments);
      }

      return loadCompany;
    }()
  }, {
    key: "createJob",
    value: function () {
      var _createJob = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(job) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                query = "mutation addNewJob($job: JobInput!) { jobAdd(job: $job) {title, _id}} ";
                _context7.next = 3;
                return graphQLFetch(query, {
                  job: job
                });

              case 3:
                data = _context7.sent;

                if (data) {
                  this.loadData();
                }

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function createJob(_x5) {
        return _createJob.apply(this, arguments);
      }

      return createJob;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Job Tracker"), /*#__PURE__*/React.createElement(JobsFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(JobTable, {
        jobs: this.state.jobs
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(JobAdd, {
        createJob: this.createJob,
        comp: this.state.companies
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(SkillList, null));
    }
  }]);

  return JobList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(JobList, null);
ReactDOM.render(element, document.getElementById('contents'));