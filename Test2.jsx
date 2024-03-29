import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyComponent() {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState(null);

  const createImage = () => {
    const REST_API_KEY = process.env.REACT_APP_KOGPT_API_KEY;
    // const negative_prompt = "sleeping cat, dog, human, ugly face, cropped";

    axios
      .post(
        "https://api.kakaobrain.com/v2/inference/karlo/t2i",
        {
          prompt,
          // negative_prompt,
        },
        {
          headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (
          response.data &&
          response.data.images &&
          response.data.images.length > 0
        ) {
          setImageURL(response.data.images[0].image);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          marginTop: "20px",
          gap: "20px",
        }}
      >
        <Link to={"/"}> {"<-"}</Link>
        <input
          type="text"
          value={prompt}
          style={{ width: "1000px", height: "30px" }}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={createImage}>create</button>
      </div>

      {imageURL && <img src={imageURL} alt="Generated" />}
    </div>
  );
}

export default MyComponent;
