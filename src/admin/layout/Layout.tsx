import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../screen/header/Header";
import SidebarPanel from "../screen/sidebar/Sidebar";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import Joyride from "react-joyride";

const steps = [
  {
    target: ".Dashboard",
    content:
      "This is the dashboard, where you can get an overview of your activities.",
    disableBeacon: true,
  },
  {
    target: ".featured",
    content:
      "This section shows the most important information about your store.",
  },
  {
    target: ".charts",
    content:
      "Here you can view charts and graphs that show your store's performance.",
  },
  {
    target: ".widget",
    content:
      "This widget shows the number of customers and the recent products.",
  },
  {
    target: ".Orders",
    content: "Here you can view and manage all customer orders.",
  },
  {
    target: ".Users",
    content: "This section allows you to manage user accounts and permissions.",
  },
  {
    target: ".Products",
    content: "View and manage the products in your store here.",
  },
  {
    target: ".Add-Category",
    content: "Add new product categories here.",
  },
  {
    target: ".Flash-Sales",
    content: "Manage flash sales and limited-time offers here.",
  },
  {
    target: ".Banners",
    content: "Upload and manage banner images from this section.",
  },
  {
    target: ".Change-Content",
    content: "Edit content and make adjustments to your CMS.",
  },
  {
    target: ".Discount",
    content: "Create and manage discount offers for your store.",
  },
  {
    target: ".Ratings",
    content: "View customer ratings and reviews for your products.",
  },
];

const AdminLayout = () => {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");

    if (!hasSeenTour) {
      setRunTour(true);
      localStorage.setItem("hasSeenTour", "true");
    }
  }, []);

  const startTour = () => {
    setRunTour(true);
  };

  return (
    <>
      <Joyride
        steps={steps}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        run={runTour}
        callback={(data) => {
          const { status } = data;
          const finishedStatuses = ["finished", "skipped"];
          if (finishedStatuses.includes(status)) {
            setRunTour(false);
          }
        }}
        styles={{
          options: {
            arrowColor: "#3498db",
            backgroundColor: "#3498db",
            overlayColor: "rgba(0, 0, 0, 0.5)",
            textColor: "#fff",
            primaryColor: "#f39c12",
            zIndex: 1000,
          },
          buttonNext: {
            backgroundColor: "#f39c12",
            color: "#fff",
            borderRadius: "4px",
            padding: "6px 12px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.15)",
          },
          buttonBack: {
            color: "#2c3e50",
            marginRight: 10,
          },
          buttonClose: {
            color: "#fff",
          },
          tooltip: {
            borderRadius: "8px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            padding: "16px",
          },
          spotlight: {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
          },
          tooltipContainer: {
            textAlign: "left",
          },
        }}
      />

      <MaxWidthWrapper>
        <Header />
        <div className="mt-5 flex h-full w-full">
          <SidebarPanel />

          <div className="flex-1 lg:ml-64">
            <Outlet />
          </div>
        </div>

        <div className="fixed bottom-5 right-5">
          <button
            onClick={startTour}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-600"
          >
            Start Tour
          </button>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default AdminLayout;
