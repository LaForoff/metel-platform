import { Navigate, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { CallsPage } from "../pages/CallsPage";
import { ChatsPage } from "../pages/ChatsPage";
import { EmployeesPage } from "../pages/EmployeesPage";
import { SettingsPage } from "../pages/SettingsPage";
import { TasksPage } from "../pages/TasksPage";
import { UiPreviewPage } from "../pages/UiPreviewPage";

export const router = createBrowserRouter([
  { path: "ui-preview", element: <UiPreviewPage /> },
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/chats" replace /> },
      { path: "chats", element: <ChatsPage /> },
      { path: "calls", element: <CallsPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "employees", element: <EmployeesPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
