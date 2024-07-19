"use client"
import NotificationListing from "@/app/components/NotificationListing";
import { useNotifications } from "../../../../ctx/NotificationsContext";

export default function Page() {
  const { notifications } = useNotifications();

  return (
    <>
      <div className="flex flex-col w-full h-full gap-y-4 bg-white">
        {notifications.map((notification) => {
          return (
            <NotificationListing
              key={notification.id}
              {...notification}
            />
          );
        })}
      </div>
    </>
  );
}
