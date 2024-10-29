import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QUOTE } from "../gqlOperations/mutations";

export default function CreateQuote() {
  const [quote, setQuote] = useState("");

  const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["getMyProfile", "getAllQuotes"],
  });

  if (loading) return <h1>Loading</h1>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createQuote({
      variables: {
        name: quote,
      },
    });
  };
  return (
    <div className="container my-container">
      {error?.message && <div className="red card-panel">{error.message}</div>}
      {data?.createQuote && (
        <div className="green card-panel">Quote added succesfully</div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="write your quote here"
        />
        <button className="btn green">create</button>
      </form>
    </div>
  );
}
