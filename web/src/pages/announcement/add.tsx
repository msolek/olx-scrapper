import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useCreateAnnouncementMutation } from "../../generated/graphql";

interface addAnouncementProps {}
const AddAnouncement: React.FC<addAnouncementProps> = ({}) => {
  const router = useRouter;
  const [addAnnouncement] = useCreateAnnouncementMutation();

  return (
    <Formik>
      initialValues={{ url: "", dupa: "" }}
      onSubmit=
      {async (values) => {
        const response = await addAnnouncement;
        console.log(response);
      }}
      >
      {(props) => (
        <Form>
          <Field url="url">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">First name</FormLabel>
                <Input {...field} id="name" placeholder="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default AddAnouncement;
