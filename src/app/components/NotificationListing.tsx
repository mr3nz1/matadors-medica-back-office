import Image from "next/image";
import closeIcon from "../../../public/closeIcon.svg";
import calendarIcon from "../../../public/calendarIcon.svg";
import calendar2Icon from "../../../public/calendar2Icon.svg";
import serviceIcon from "../../../public/serviceIcon.svg";
import walletIcon from "../../../public/walletIcon.svg";
import React from "react";

interface Props {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  patientId: string;
  doctorId: string;
  viewed: boolean;
  type: string;
}

export const icons: { [key: string]: React.JSX.Element } = {
  accountSetupIcon: (
    <div className="p-3 rounded-full bg-green-200">
      <Image src={closeIcon} alt="" priority />
    </div>
  ),
  apppointmentScheduleIcon: (
    <div className="p-3 rounded-full bg-green-200">
      <Image src={calendarIcon} alt="" priority />
    </div>
  ),
  appointmentCompletionIcon: (
    <div className="p-3 rounded-full bg-blue-200">
      <Image src={calendar2Icon} alt="" priority />
    </div>
  ),
  infoIcon: (
    <div className="p-3 rounded-full bg-yellow-200">
      <Image src={serviceIcon} alt="" priority />
    </div>
  ),
  creditCardConnectedIcon: (
    <div className="p-3 rounded-full bg-green-200">
      <Image src={walletIcon} alt="" priority />
    </div>
  ),
};

export default function NotificationListing({
  title,
  description,
  createdAt,
  type,
}: Props) {
  console.log("type: ", type);
  return (
    <>
      <div className="flex flex-col gap-y-4 flex-1">
        <div className="flex flex-row space-between items-center w-full">
          <div className="flex flex-row gap-x-4 w-1/2">
            {type === "account_setup"
              ? icons.accountSetupIcon
              : type === "appointment_booked"
              ? icons.apppointmentScheduleIcon
              : type === "appointment_changed"
              ? icons.apppointmentScheduleIcon
              : type === "appointment_completed"
              ? icons.appointmentCompletionIcon
              : type === "new_service"
              ? icons.infoIcon
              : icons.creditCardConnectedIcon}
            {/* <div className="h-10 w-10 rounded-full bg-blue-300"></div> */}

            <div className="flex flex-col">
              <h1 className="text-md font-bold">{title}</h1>
              <p className="text-xs text-gray-700">
                {createdAt
                  .toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(",", "") +
                  " | " +
                  createdAt
                    .toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                    .replace(" ", "")}
              </p>
            </div>
          </div>

          <div className="px-2 py-1 rounded-sm bg-blue-600 text-xs text-white">
            New
          </div>
        </div>
        <div className="w-1/2">
          <p className="text-xs text-gray-700">{description}</p>
        </div>
      </div>
    </>
  );
}
