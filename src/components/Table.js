import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";

// const Table = ({ refresh, metaDataURI }) => {
const Table = ({ data }) => {
  console.log("🚀 ~ file: Table.js ~ line 5 ~ Table ~ refresh", data);
  const myKeyTable = uuidv4();
  //   const handleClick = () => {
  //     // manually refetch
  //     refetch();
  //   };

  //   refresh && refetch();

  // useEffect(() => {
  //   refetch();
  // }, [refresh]);

  // const getTraits = async () => {
  //   const res = await fetch(`https://gateway.pinata.cloud/ipfs/${metaDataURI}`);
  //   return await res.json();
  // };

  // const { data, status, refetch } = useQuery("traits", getTraits, { enabled: false });

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.attributes.map((trait, i) => (
              <tr key={"table" + i}>
                <th>{i}</th>
                <td>{trait.trait_type}</td>
                <td>{trait.value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
