import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/toPromise';

import { Action, Store, Unsubscribe } from 'redux';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { ReduxRootState } from '../interfaces/redux-root-state.interface';
import { ReduxStateDecorator } from '@harmowatch/redux-decorators';
import { ReduxStateProviderType } from '../interfaces/redux-state.provider.interface';

@Injectable()
export class ReduxTestingStore implements Store<{}> {

  private state = new BehaviorSubject(null);

  public static factory(): ReduxTestingStore {
    return new ReduxTestingStore();
  }

  public setState<S>(state: ReduxStateProviderType, value: S): Promise<ReduxRootState> {
    const {name} = ReduxStateDecorator.get(state);

    const nextState = Object.assign({}, this.state.getValue(), {
      [ name ]: value,
    });

    this.state.next(nextState);

    return this.state
      .takeWhile(currentState => currentState !== nextState)
      .toPromise().then(() => this.state.getValue());
  }

  public getState(): {} {
    return this.state.getValue();
  }

  public subscribe(listener: () => void): Unsubscribe {
    return this.state.subscribe.call(this.state, listener);
  }

  public replaceReducer() {
  }

  public dispatch<T extends Action>(action: T): T {
    return action;
  }

}
