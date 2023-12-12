/* eslint-disable react/prop-types */
import { Sheet, Input, Button } from "@mui/joy";
import { useState, useRef, useEffect } from "react";

const StudentForm = ({ studentFetcher }) => {
  const [file, setFile] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (studentFetcher.state === "submitting") {
      formRef.current.reset();
      setFile(null)
    }
  }, [studentFetcher]);

  return (
    <Sheet
      key={studentFetcher?.data?.id}
      ref={formRef}
      component={studentFetcher.Form}
      method="post"
      action={
        studentFetcher?.data
          ? `students/${studentFetcher.data.id}/edit`
          : "?index"
      }
      encType="multipart/form-data"
      sx={{
        flexBasis: "22%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        rowGap: 2,
      }}
    >
      <Input
        size="lg"
        name="name"
        placeholder="Enter Your Full Name"
        defaultValue={studentFetcher?.data?.attributes.name}
      />
      <Input
        size="lg"
        name="email"
        placeholder="Enter Your E-mail Address"
        defaultValue={studentFetcher?.data?.attributes.email}
      />
      <Input
        size="lg"
        name="address"
        placeholder="Enter Your Full Address"
        defaultValue={studentFetcher?.data?.attributes.address}
      />
      <Input
        size="lg"
        name="standard"
        placeholder="Enter Your Class Name"
        defaultValue={studentFetcher?.data?.attributes.standard}
      />
      <Input
        size="lg"
        name="roll"
        placeholder="Enter Your Roll Number"
        defaultValue={studentFetcher?.data?.attributes.roll}
      />
      <input
        type="file"
        name="profile"
        id="profile"
        hidden
        onChange={(e) => setFile(e.target.files[0])}
      />
      <Button color="neutral" component="label" htmlFor="profile">
        {file
          ? file.name
          : studentFetcher.data
          ? studentFetcher.data.attributes.profile.data.attributes.name
          : " Upload Profile Picture"}
      </Button>

      <Button
        name="id"
        value={studentFetcher.data?.id}
        color={studentFetcher.data ? "warning" : "primary"}
        type="submit"
      >
        {studentFetcher.data ? "Update Student" : "Create new Student"}
      </Button>
    </Sheet>
  );
};

export default StudentForm;
