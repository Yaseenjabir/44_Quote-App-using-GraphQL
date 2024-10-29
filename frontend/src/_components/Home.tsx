import { useQuery } from "@apollo/client";
import { GET_ALL_QUOtES } from "../gqlOperations/queries";
import { Link } from "react-router-dom";

export default function Home() {
  // This is traditional and not optimized way
  //   useEffect(() => {
  //     fetch("http://localhost:4000/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         query: `
  //         query getAllUsers{
  //          users{
  //           _id
  //           firstName
  //           lastName
  //           email
  //           password
  //           quotes{
  //             quote
  //             by
  //           }
  //   }
  // }
  // `,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => console.log({ data }));
  //   }, []);

  const { loading, error, data } = useQuery(GET_ALL_QUOtES);

  if (loading) return <h1>Loading</h1>;
  if (error) return <p>{error.message}</p>;
  if (data.quotes.length === 0) return <h2>No quotes available</h2>;

  return (
    <div className="container">
      {data.quotes.map((quote: any) => {
        return (
          <>
            <blockquote>
              <h6>{quote.quote}</h6>
              <Link to={`/profile/${quote.by._id}`} className="right-align">
                ~{quote.by.firstName}
              </Link>
            </blockquote>
          </>
        );
      })}
    </div>
  );
}
