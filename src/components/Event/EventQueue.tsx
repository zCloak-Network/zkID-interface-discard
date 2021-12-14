/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-27 16:44:03
 * @LastEditTime: 2021-08-27 18:13:36
 */
import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { EventProvider } from "./Context";
import { EventQueueProps } from "./type";

interface Props {
  children: React.ReactNode; // 暂时理解为传入的组件
}
export default function EventQueue({ children }: Props) {
  const { api } = useApi();
  const [eventsData, setEvents] = useState<EventQueueProps[]>([]);

  useEffect(() => {
    api.query.system.events((events) => {
      console.log(`\nReceived ${events.length} events:`);
      console.log(events.toJSON());
      // console.log(events[0].event.meta.documentation);

      events.forEach(({ event }) => {
        const { section, method, data, meta } = event;
        // console.log(`\t\t${event.meta.documentation.toString()}`);
        const types = event.typeDef;
        const typeData: any = [];
        data.forEach((data, index) => {
          console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
          typeData.push({
            type: types[index].type,
            eData: data.toJSON(),
          });
        });
        console.log(typeData);
        // const docs = meta.documentation.toString() + "";
        // const doc = docs.replace(/[\\]/g, "");

        setEvents([
          {
            section: section,
            method: method,
            showData: typeData,
            documentation: "",
            data: data.toJSON(),
          },
        ]);
      });
    });
  }, []);
  return (
    <>
      <EventProvider value={eventsData}>{children}</EventProvider>
    </>
  );
}
