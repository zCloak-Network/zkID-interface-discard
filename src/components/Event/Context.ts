import React from 'react';
import { EventQueueProps } from './type';

const EventContext: React.Context<EventQueueProps[]> = React.createContext<EventQueueProps[]>({} as EventQueueProps[]);
const EventConsumer: React.Consumer<EventQueueProps[]> = EventContext.Consumer;
const EventProvider: React.Provider<EventQueueProps[]> = EventContext.Provider;

export default EventContext;

export { EventConsumer, EventProvider };
