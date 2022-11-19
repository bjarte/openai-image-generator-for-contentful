import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY }));

const Entry = () => {

  const [descriptionInput, setDescriptionInput] = useState("");
  const [result, setResult] = useState([]);

  const handleFormEvent = async (event) => {

    event.preventDefault();

    const image = await openai.createImage({
      prompt: descriptionInput,
      n: 4,
      size: "1024x1024",
    });

    setResult([
      image.data.data[0].url,
      image.data.data[1].url,
      image.data.data[2].url,
      image.data.data[3].url
    ]);
  }

  return (
    <main>

      <form onSubmit={handleFormEvent}>

        <p>
          <textarea
            name="description"
            placeholder="Describe the image to create"
            cols="75"
            rows="4"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          ></textarea>
        </p>

        <p>
          <input type="submit" value="Generate images" />
        </p>

      </form>

      {typeof (result[0]) !== "undefined" &&
        <section>
          <p><a href={result[0]}><img src={result[0]} width="400" height="400" alt="" /></a></p>
          <p><a href={result[1]}><img src={result[1]} width="400" height="400" alt="" /></a></p>
          <p><a href={result[2]}><img src={result[2]} width="400" height="400" alt="" /></a></p>
          <p><a href={result[3]}><img src={result[3]} width="400" height="400" alt="" /></a></p>
        </section>
      }

    </main>
  );
}

export default Entry;
