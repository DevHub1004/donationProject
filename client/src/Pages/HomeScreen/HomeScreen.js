import React, { useEffect, useState } from "react";
import Article from "./Article";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call
        const response = await fetch("http://localhost:8000/api/videos"); // Replace with your endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json(); // Parse JSON
        setData(result.videos);
        console.log(result); // Set the data to state
        setLoading(false);
      } catch (err) {
        console.log(err.message); // Handle any errors
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <div>loading ....</div>
  ) : (
    <div className="HomePage">
      <h1>Web site name</h1>
      {data.map((ele) => (
        <Article key={ele.id} ele={ele} />
      ))}
    </div>
  );
};

export default HomeScreen;
