import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssVarsProvider, CssBaseline, GlobalStyles } from "@mui/joy";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:1337";

// add font
import "@fontsource/inter";

// import pages
import Layout from "./routes/layout";
import Students from "./routes/students";

// create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Students />,
        loader: async () => {
          const response = await axios.get("/api/students?populate=*");
          return response.data.data;
        },
        action: async ({ request }) => {
          let formdata = await request.formData();
          formdata = Object.fromEntries(formdata);
          delete formdata["id"];
          const { profile, ...rest } = formdata;

          const studentFormData = new FormData();
          studentFormData.append("files.profile", profile);
          studentFormData.append("data", JSON.stringify(rest));

          await axios.post("/api/students", studentFormData);
          return null;
        },
      },
      {
        path: "students/:id/edit",
        loader: async ({ params }) => {
          const id = params.id;
          const response = await axios.get(`/api/students/${id}?populate=*`);
          return response.data.data;
        },
        action: async ({ request }) => {
          let formdata = await request.formData();
          formdata = Object.fromEntries(formdata);
          const { id, profile, ...rest } = formdata;

          const studentFormData = new FormData();
          profile.size > 0 && studentFormData.append("files.profile", profile);
          studentFormData.append("data", JSON.stringify(rest));

          await axios.put(`/api/students/${id}`, studentFormData);
          return null;
        },
      },
      {
        path: "students/:id/delete",
        action: async ({ request }) => {
          let formData = await request.formData();
          formData = Object.fromEntries(formData);
          const id = formData.id;
          await axios.delete(`/api/students/${id}`);
          return null;
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <CssVarsProvider defaultMode="dark">
    <CssBaseline />
    <GlobalStyles />
    <RouterProvider router={router} />
  </CssVarsProvider>
);
