//! Input form
import { useState } from "react";
import { useHistory } from "react-router-dom";
import AbortController from "abort-controller";
import AutoID from "./AutoID";
// import useFetch from "../useFetch";
// import DataList from "./DataList";

const Create = () => {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [chainType, setChain] = useState("necklace");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const controller = new AbortController();

    let client = { productId, name, email, phone, chainType };

    setIsPending(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(client);
    // console.log(typeof raw);
    // console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      "https://basi4ylpi7.execute-api.us-east-2.amazonaws.com/prod/product",
      requestOptions
    )
      .then(() => {
        setIsPending(false);
        controller.abort();
        history.push("/datas");
      })
      .then((result) => {
        console.log(result);
      })

      .catch((error) => console.log("error", error));
  };

  return (
    <div className="create">
      <h2>Add New Client</h2>
      <form onSubmit={handleSubmit}>
        <label> ProductId:</label>
        <button onClick={() => AutoID()}>Random ID</button>
        {/* {AutoID()} */}
        <input
          type="text"
          required
          placeholder={AutoID()}
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <label>Name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Phone:</label>
        <input
          type="text"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label> Email:</label>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label> Chain Type:</label>
        <select value={chainType} onChange={(e) => setChain(e.target.value)}>
          <option value="necklace">Necklace</option>
          <option value="chain">Chain</option>
        </select>
        {!isPending && <button>Submit</button>}
        {isPending && <button disabled>Adding client...</button>}
      </form>
    </div>
  );
};

export default Create;