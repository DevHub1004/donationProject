import React from "react";
import "./style.css";
import video from "./../../Assets/mov_bbb.mp4";

var vidUrl = "./../Assets/mov_bbb.mp4";

const Article = (ele) => {
  const blob = new Blob([ele.ele.data], { type: "video/mp4" }); // Change type if needed
  vidUrl = URL.createObjectURL(blob);
  console.log(ele.ele.title);
  return (
    <div className="articleBox">
      <video width="300" height="200" controls autoPlay>
        <source src={vidUrl} type="video/mp4" />
      </video>
      <div className="rightBox">
        <h5>{ele.ele.title}</h5>
        <pre>{ele.ele.description}</pre>
        <p>{ele.ele.details}</p>
      </div>
    </div>
  );
};

export default Article;
