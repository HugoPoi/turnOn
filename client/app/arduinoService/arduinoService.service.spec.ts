'use strict';

describe('Service: arduinoService', function () {

  // load the service's module
  beforeEach(module('turnOnApp.arduinoService'));

  // instantiate service
  var arduinoService;
  beforeEach(inject(function (_arduinoService_) {
    arduinoService = _arduinoService_;
  }));

  it('should do something', function () {
    expect(!!arduinoService).to.be.true;
  });

});
