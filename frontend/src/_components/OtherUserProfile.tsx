import { useQuery } from "@apollo/client";
import { GET_OTHER_USER_PROFILE } from "../gqlOperations/queries";
import { useParams } from "react-router";

export default function OtherUserProfile() {
  const { userid } = useParams();

  const { data, loading, error } = useQuery(GET_OTHER_USER_PROFILE, {
    variables: {
      userid,
    },
  });

  if (error) console.log(error);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>{data.user.firstName}</h5>
        <h6>{data.user.email}</h6>
      </div>
      <h3>{data.user.firstName}'s quotes</h3>
      {data.user.quotes.map((item: any) => {
        return (
          <blockquote>
            <h6>{item.quote}</h6>
          </blockquote>
        );
      })}
    </div>
  );
}
