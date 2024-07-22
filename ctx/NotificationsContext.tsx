"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase/config";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useAuth } from "./AuthContext";

export interface NotificationsType {
  notifications: NotificationType[];
  getNotifications: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  createNotification: (notificaction: NotificationType) => Promise<void>;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>;
}

export interface NotificationType {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  patientId: string;
  doctorId: string;
  viewed: boolean;
  type: NotificationCategoryType;
}

export type NotificationCategoryType =
  | "appointment_changed"
  | "appointment_completed"
  | "appointment_booked"
  | "new_service"
  | "payment_setup"
  | "account_setup";

export const NotificationsContext = createContext<NotificationsType>({
  notifications: [],
  getNotifications: async () => {},
  deleteNotification: async (id: string) => {},
  createNotification: async (notification: NotificationType) => {},
  setNotifications: () => {},
});

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}

export default function NotificationsProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { isLoggedIn, user } = useAuth();

  async function getNotifications() {}

  async function deleteNotification(id: string) {
    console.log(id);
  }

  async function createNotification(notification: NotificationType) {
    console.log(notification);
  }

  useEffect(() => {
    if (isLoggedIn && user.id !== "") {
      const fetchInitialNotifications = async () => {
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("doctor_id", user.doctorId);

        if (error) {
          console.error("Error fetching notifications:", error);
        } else {
          const notifs = data.map((notification) => {
            return {
              id: notification.id,
              createdAt: new Date(notification.created_at),
              title: notification.title,
              description: notification.description,
              patientId: notification.patient_id,
              doctorId: notification.doctor_id,
              viewed: notification.viewed,
              type: notification.type,
            };
          });

          setNotifications(notifs || []);
        }
      };

      fetchInitialNotifications();

      const channel = supabase
        .channel("notifications")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public" },
          (
            payload: RealtimePostgresInsertPayload<{ [key: string]: string }>
          ) => {
            const newNotification = payload.new;

            console.log("New notification: ", newNotification);

            if (newNotification.doctor_id === user.doctorId) {
              console.log(
                "Comparing doctors: ",
                newNotification.doctor_id,
                user.doctorId
              );
              setNotifications((prevNotifications) => [
                ...prevNotifications,
                {
                  id: newNotification.id,
                  createdAt: new Date(newNotification.created_at),
                  title: newNotification.title,
                  description: newNotification.description,
                  patientId: newNotification.patient_id,
                  doctorId: newNotification.doctor_id,
                  viewed: newNotification.viewed as unknown as boolean,
                  type: newNotification.type as NotificationCategoryType,
                },
              ]);

              if (Notification.permission === "granted") {
                var notify = new Notification(newNotification.title, {
                  body: newNotification.description,
                  icon: "https://bit.ly/2DYqRrh",
                });
              }
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isLoggedIn, user]);

  const value = {
    notifications,
    getNotifications,
    setNotifications,
    deleteNotification,
    createNotification,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationsContext);
