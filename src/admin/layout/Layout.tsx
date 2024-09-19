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
  const [runTour, setRunTour] = useState(false); // Controls if the tour is running

  // Check if the admin has seen the tour before
  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");

    if (!hasSeenTour) {
      setRunTour(true); // Start the tour if they haven't seen it
      localStorage.setItem("hasSeenTour", "true"); // Mark the tour as seen
    }
  }, []);

  // Function to manually start the tour
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
        run={runTour} // Start the tour based on state
        callback={(data) => {
          // Stop the tour when it's finished or skipped
          const { status } = data;
          const finishedStatuses = ["finished", "skipped"];
          if (finishedStatuses.includes(status)) {
            setRunTour(false);
          }
        }}
        styles={{
          options: {
            arrowColor: "#3498db", // Updated to a more vibrant blue for contrast
            backgroundColor: "#3498db", // Matching background with arrow for consistency
            overlayColor: "rgba(0, 0, 0, 0.5)", // Darkened overlay for better focus on the content
            textColor: "#fff", // White text for readability against the blue background
            primaryColor: "#f39c12", // Bright orange for primary buttons and focus color
            zIndex: 1000, // Ensuring the tour appears on top of most elements
          },
          buttonNext: {
            backgroundColor: "#f39c12", // Bright orange for the "Next" button
            color: "#fff", // White text for contrast
            borderRadius: "4px", // Subtle rounded corners for a modern look
            padding: "6px 12px", // Added padding for a more clickable area
            boxShadow: "0px 2px 10px rgba(0,0,0,0.15)", // Light shadow for depth
          },
          buttonBack: {
            color: "#2c3e50", // Dark grey for "Back" button
            marginRight: 10, // Add spacing between "Back" and "Next" buttons
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
        <div className="mt-2 flex gap-4">
          <SidebarPanel />

          <Outlet />
        </div>

        {/* Button to manually start the tour */}
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
