import { TodoState } from './todo.module.state';
import { ReduxState } from '../../harmowatch/ngx-redux-core/decorators/index';
import { ReduxStateProvider } from '../../harmowatch/ngx-redux-core/providers/redux-state.provider';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
@ReduxState({name: 'todo'})
export class TodoModuleStateProvider extends ReduxStateProvider<TodoState> {

  getInitialState(): Promise<TodoState> {
    return Promise.resolve({
      items: []
    });
  }

  select<T>(selector: string = ''): Observable<T> {

    if (selector === 'todos') {
      selector = 'items';
    }

    return super.select(selector);
  }

}
