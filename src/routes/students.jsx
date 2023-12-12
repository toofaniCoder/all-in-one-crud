import { Table, Avatar, IconButton, Stack } from "@mui/joy";
import axios from "axios";
import { useFetcher, useLoaderData, useOutletContext } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Students = () => {
  const students = useLoaderData();
  const { studentFetcher } = useOutletContext();
  const fetcher = useFetcher();
  //   console.log(students);
  return (
    <Table variant="outlined" aria-label="basic table">
      <thead>
        <tr>
          <th>Profile</th>
          <th>Full Name</th>
          <th>E-mail Address</th>
          <th>Class</th>
          <th>Roll Number</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map(({ id, attributes }) => (
          <tr key={id}>
            <td>
              <Avatar
                src={`${axios.defaults.baseURL}${attributes.profile.data.attributes.url}`}
              />
            </td>
            <td>{attributes.name}</td>
            <td>{attributes.email}</td>
            <td>{attributes.standard}</td>
            <td>{attributes.roll}</td>
            <td>
              <Stack direction={"row"}>
                <IconButton
                  color="success"
                  onClick={() => studentFetcher.load(`students/${id}/edit`)}
                >
                  <EditOutlinedIcon />
                </IconButton>
                <fetcher.Form method="post" action={`students/${id}/delete`}>
                  <IconButton name="id" value={id} color="danger" type="submit">
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </fetcher.Form>
              </Stack>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Students;
