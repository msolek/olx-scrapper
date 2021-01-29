import { gql, useQuery, NetworkStatus } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";

interface AnnouncementProps {
  announcements: Array<Announcement>;
}

export const ALL_ANNOUNCEMENTS_QUERY = gql`
  query allAnnouncements {
    announcements {
      id
      url
      name
      img
      userProfile
      description
      isActive
      createdAt
      updatedAt
    }
  }
`;
export default function AnnouncementListList() {
  const { loading, error, data, networkStatus } = useQuery(
    ALL_ANNOUNCEMENTS_QUERY,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  if (error) return <ErrorMessage message="Error loading announcements." />;
  if (loading) return <div>Loading</div>;

  let { announcements } = data;
  console.log("data" + JSON.stringify(announcements));

  return (
    <section>
      {
        <ul>
          {announcements.map((announcement, index) => (
            <li key={announcement.id}>
              <div>
                <span>{index + 1}. </span>
                <a href={announcement.id}>{announcement.name}</a>
                {announcement.isActive == false && (
                  <p>
                    {" "}
                    announcement is not avaialbe{" "}
                    <a href={announcement.userProfile}>
                      check other user's announcements
                    </a>{" "}
                  </p>
                )}
                <img
                  src={announcement.img}
                  alt=""
                  height="100px"
                  width="100px"
                ></img>
                <p>
                  {" "}
                  Created date: {announcement.createdAt}, updated:{" "}
                  {announcement.updatedAt}
                </p>
              </div>
            </li>
          ))}
        </ul>
      }

      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: "";
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  );
}
