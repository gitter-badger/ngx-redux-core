import { ReduxActionFunc } from './function';

export type ReduxActionDecorator = (target: object,
                                    propertyKey: string | symbol,
                                    descriptor: TypedPropertyDescriptor<ReduxActionFunc>) => void;