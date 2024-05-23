export interface NotificationProp {
  notificationId: number;
  userId: number;
  orderId: number;
  title: string;
  message: string;
  read: boolean;
  notificationDate: Date;
}
