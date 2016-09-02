"use strict";
var reducer_1 = require('./reducer');
var dispatcher_1 = require('./dispatcher');
var store_1 = require('./store');
var state_1 = require('./state');
var utils_1 = require('./utils');
var core_1 = require('@angular/core');
exports.INITIAL_REDUCER = new core_1.OpaqueToken('Token ngrx/store/reducer');
exports.INITIAL_STATE = new core_1.OpaqueToken('Token ngrx/store/initial-state');
exports._INITIAL_REDUCER = new core_1.OpaqueToken('Token _ngrx/store/reducer');
exports._INITIAL_STATE = new core_1.OpaqueToken('Token _ngrx/store/initial-state');
function _initialReducerFactory(reducer) {
    if (typeof reducer === 'function') {
        return reducer;
    }
    return utils_1.combineReducers(reducer);
}
exports._initialReducerFactory = _initialReducerFactory;
function _initialStateFactory(initialState, reducer) {
    if (!initialState) {
        return reducer(undefined, { type: dispatcher_1.Dispatcher.INIT });
    }
    return initialState;
}
exports._initialStateFactory = _initialStateFactory;
function _storeFactory(dispatcher, reducer, state$) {
    return new store_1.Store(dispatcher, reducer, state$);
}
exports._storeFactory = _storeFactory;
function _stateFactory(initialState, dispatcher, reducer) {
    return new state_1.State(initialState, dispatcher, reducer);
}
exports._stateFactory = _stateFactory;
function _reducerFactory(dispatcher, reducer) {
    return new reducer_1.Reducer(dispatcher, reducer);
}
exports._reducerFactory = _reducerFactory;
;
/**
 * @deprecated, use StoreModule.provideStore instead!
 */
function provideStore(_reducer, _initialState) {
    return [
        dispatcher_1.Dispatcher,
        { provide: store_1.Store, useFactory: _storeFactory, deps: [dispatcher_1.Dispatcher, reducer_1.Reducer, state_1.State] },
        { provide: reducer_1.Reducer, useFactory: _reducerFactory, deps: [dispatcher_1.Dispatcher, exports.INITIAL_REDUCER] },
        { provide: state_1.State, useFactory: _stateFactory, deps: [exports.INITIAL_STATE, dispatcher_1.Dispatcher, reducer_1.Reducer] },
        { provide: exports.INITIAL_REDUCER, useFactory: _initialReducerFactory, deps: [exports._INITIAL_REDUCER] },
        { provide: exports.INITIAL_STATE, useFactory: _initialStateFactory, deps: [exports._INITIAL_STATE, exports.INITIAL_REDUCER] },
        { provide: exports._INITIAL_STATE, useValue: _initialState },
        { provide: exports._INITIAL_REDUCER, useFactory: _reducer }
    ];
}
exports.provideStore = provideStore;
var StoreModule = (function () {
    function StoreModule() {
    }
    StoreModule.provideStore = function (_reducer, _initialState) {
        return {
            ngModule: StoreModule,
            providers: provideStore(_reducer, _initialState)
        };
    };
    /** @nocollapse */
    StoreModule.decorators = [
        { type: core_1.NgModule, args: [{},] },
    ];
    return StoreModule;
}());
exports.StoreModule = StoreModule;
//# sourceMappingURL=ng2.js.map