import { Container, Box } from "@mui/joy";
import { Outlet, useFetcher } from "react-router-dom";
import StudentForm from "../components/student-form";
const Layout = () => {
  const studentFetcher = useFetcher();

  console.log(studentFetcher)
  return (
    <Container maxWidth="xl" disableGutters>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          "&>*": {
            p: 4,
          },
        }}
      >
        <StudentForm studentFetcher={studentFetcher} />
        <Box sx={{ flexGrow: 1 }}>
          <Outlet context={{ studentFetcher }} />
        </Box>
      </Box>
    </Container>
  );
};

export default Layout;
