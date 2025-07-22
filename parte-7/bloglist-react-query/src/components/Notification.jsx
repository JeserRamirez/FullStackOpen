import { useNotificationValue } from '../reducers/NotificationContextReducer';

const Notification = () => {
  const notification = useNotificationValue();

  if (!notification) return null;

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
};

export default Notification;
