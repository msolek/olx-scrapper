import { gql, useMutation } from "@apollo/client";

const CREATE_ANNOUNCEMENT_MUTATION = gql`
  mutation createAnnouncement($url: String!) {
    createAnnouncement(url: $url) {
      url
    }
  }
`;

export default function CreateAnnouncement() {
  const [createAnnouncement, { loading }] = useMutation(
    CREATE_ANNOUNCEMENT_MUTATION
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new window.FormData(form);
    const url = formData.get("url");
    form.reset();

    createAnnouncement({
      variables: { url },
      update: (cache, { data: { createAnnouncement } }) => {
        cache.modify({
          fields: {
            allAnnouncements(existingAnnoucements = []) {
              const newAnnouncementRef = cache.writeFragment({
                data: createAnnouncement,
                fragment: gql`
                  fragment NewAnnouncement on allAnnouncements {
                    id
                    type
                  }
                `,
              });
              return [newAnnouncementRef, ...existingAnnoucements];
            },
          },
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new announcement</h1>
      <input placeholder="url" name="url" type="url" required />
      <button type="submit" disabled={loading}>
        Add
      </button>
      <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </form>
  );
}
