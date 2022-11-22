import { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import { Textarea } from '@contentful/f36-components';
import { FormControl } from '@contentful/f36-components';
import { Button } from '@contentful/f36-components';
import { Form } from '@contentful/f36-components';
import { Paragraph } from '@contentful/f36-components';
import { Workbench } from '@contentful/f36-workbench';

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY }));

const Entry = () => {

  const [descriptionInput, setDescriptionInput] = useState("");
  const [result, setResult] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const submitDescription = async (event) => {

    event.preventDefault();

    setSubmitted(true);

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
      <Workbench>
        <Workbench.Header title="Bjarte's Wonderful OpenAI Image Creator" />
        <Workbench.Content>

          <Form onSubmit={submitDescription}>
            <FormControl isRequired>
              <FormControl.Label>Description</FormControl.Label>
              <Textarea
                name="description"
                value={descriptionInput}
                placeholder="Describe the image to create…"
                onChange={(e) => setDescriptionInput(e.target.value)}
              />
              <FormControl.HelpText>
                Please enter a text describing the image you want to generate.
              </FormControl.HelpText>
            </FormControl>
            <Button variant="primary" type="submit" isDisabled={submitted}>
              {submitted ? '⌛ Please wait…' : 'Generate images'}
            </Button>
          </Form>

          {typeof (result[0]) !== "undefined" &&
            <Paragraph>
              <Paragraph marginTop="spacingXl">
                <a href={result[0]}><img src={result[0]} width="310" height="310" alt="" /></a>
              </Paragraph>
              <Paragraph marginTop="spacingXl">
                <a href={result[1]}><img src={result[1]} width="310" height="310" alt="" /></a>
              </Paragraph>
              <Paragraph marginTop="spacingXl">
                <a href={result[2]}><img src={result[2]} width="310" height="310" alt="" /></a>
              </Paragraph>
              <Paragraph marginTop="spacingXl">
                <a href={result[3]}><img src={result[3]} width="310" height="310" alt="" /></a>
              </Paragraph>
            </Paragraph>
          }

        </Workbench.Content>
      </Workbench>
  );
}

export default Entry;
