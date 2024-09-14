import React, { useState, useCallback, useEffect } from "react";

const ExpensiveComponent = React.memo(({ onDataFetch }) => {
  useEffect(() => {
    console.log("ExpensiveComponent: Fetching data...");
    onDataFetch();
  }, [onDataFetch]);

  return <div>Expensive Component (check console for effects)</div>;
});

const DataFetchingComponent = () => {
  const [data, setData] = useState(null);
  const [fetchId, setFetchId] = useState(1);

  const fetchData = useCallback(() => {
    // Simulating an API call
    console.log(`Fetching data with ID: ${fetchId}`);
    // In a real scenario, you'd make an API call here
    setData(`Data from fetch ${fetchId}`);
  }, [fetchId]);

  return (
    <div>
      <h2>Data: {data || "No data fetched yet"}</h2>
      <button onClick={() => setFetchId((prev) => prev + 1)}>
        Change Fetch ID
      </button>
      <ExpensiveComponent onDataFetch={fetchData} />
    </div>
  );
};

export default DataFetchingComponent;
