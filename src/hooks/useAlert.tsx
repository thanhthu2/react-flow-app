import { AppEvents } from '@grafana/data';
import { getAppEvents } from '@grafana/runtime';
import { TYPE_REQUEST } from 'types/alert.types';

export function useAlert() {
  const appEvents = getAppEvents();
  const showAlert = (msg: string, type: TYPE_REQUEST) => {
    appEvents.publish({
      type: AppEvents[type].name,
      payload: [msg],
    });
  };

  return {
    showAlert,
  };
}
