import { NotificationsType } from "@/interfaces/INotifications";
import { store } from "@/store";
import { NOTIFY } from "@/store/types-mutations";

type Notifier = {
  notifier: (type: NotificationsType, title: string, text: string) => void;
};

export default (): Notifier => {
  const notifier = (
    type: NotificationsType,
    title: string,
    text: string
  ): void => {
    store.commit(NOTIFY, {
      title,
      text,
      type,
    });
  };
  return {
    notifier,
  };
};
