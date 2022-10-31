import React from "react";
const Table = ({ data }) => {
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
                <th className="p-2">{i}</th>
                <td className="p-2">{trait.trait_type}</td>
                <td className="p-2">{trait.value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
