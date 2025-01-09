import { CoasterInfoUpdatedHandler } from './coaster-info-updated/coaster-info-updated.handler';
import { NewCoasterRegisteredHandler } from './new-coaster-registered/new-coaster-registered.handler';
import { WagonAddedHandler } from './wagon-added/wagon-added.handler';
import { WagonDeletedHandler } from './wagon-deleted/wagon-deleted.handler';

export const EventHandlers = [
  WagonAddedHandler,
  WagonDeletedHandler,
  NewCoasterRegisteredHandler,
  CoasterInfoUpdatedHandler,
];
