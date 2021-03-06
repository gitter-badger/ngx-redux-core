import { Injector } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { VehicleModule } from './vehicle/vehicle.module';
import { ReduxModule } from '../harmowatch/ngx-redux-core/redux.module';

export function initTestingModule() {

  const testBed = TestBed.configureTestingModule({
    imports: [
      ReduxModule.forRoot(),
      VehicleModule,
    ],
  });


  testBed.get(Injector);

}


export function describeIntegrationTest(desc: string, suite: () => any) {

  describe('Integration Test', () => {

    beforeEach(async(() => initTestingModule()));
    describe(desc, suite);

  });
}
