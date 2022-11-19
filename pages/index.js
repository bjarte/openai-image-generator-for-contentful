import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [result, setResult] = useState([]);

  async function onSubmit(event) {

    event.preventDefault();

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: descriptionInput
      }),
    });

    const data = (await response.json());

    setResult(data.result);
  }

  return (
    <div>
      <Head>
        <title>Create AI Image</title>
      </Head>

      <main className={styles.main}>

        <form onSubmit={onSubmit}>

          <p>
            <textarea
              name="description"
              placeholder="Describe the image to create"
              cols="75"
              rows="10"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            ></textarea>
          </p>

          <p>
            <input type="submit" value="Generate images" />
          </p>

        </form>

        {typeof(result[0]) !== "undefined" && result[0].length > 0 &&
          <section>
            <p><a href={result[0]}><img src={result[0]} width="400" height="400" /></a></p>
            <p><a href={result[1]}><img src={result[1]} width="400" height="400" /></a></p>
            <p><a href={result[2]}><img src={result[2]} width="400" height="400" /></a></p>
            <p><a href={result[3]}><img src={result[3]} width="400" height="400" /></a></p>
          </section>
        }

      </main>
    </div>
  );
}
