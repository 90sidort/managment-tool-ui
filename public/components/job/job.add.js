"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlFetch = _interopRequireDefault(require("./utils/graphqlFetch"));

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

var JobAdd = /*#__PURE__*/function (_React$Component) {
  _inherits(JobAdd, _React$Component);

  var _super = _createSuper(JobAdd);

  function JobAdd() {
    var _this;

    _classCallCheck(this, JobAdd);

    _this = _super.call(this);
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
                query = "query getRep($cid: ID) {\n        representative(cid: $cid) {\n          _id\n          cid\n          email\n          phone\n          name\n        }\n      }";
                _context.next = 3;
                return (0, _graphqlFetch.default)(query, {
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
                query = "query getLocations($cid: ID) {\n        location(cid: $cid) {\n          _id\n          cid\n          city\n          country\n          address\n          postcode\n        }\n      }";
                _context2.next = 3;
                return (0, _graphqlFetch.default)(query, {
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

exports.default = JobAdd;