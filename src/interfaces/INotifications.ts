export enum NotificationsType {
  SUCCESS,
  FAILED,
  WARNING,
}

export interface INotifications {
  title: string;
  text: string;
  type: NotificationsType;
  id: number;
}
