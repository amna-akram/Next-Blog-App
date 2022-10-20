import { __EnumValue } from "graphql";
import { v4 as uuid } from "uuid";

const contentful = require("contentful-management");

type Blog = {
  title: string,
  author: string,
  description: string,
}
export async function createBlog({
  title,
  author,
  description,
}: Blog) {

  const client = contentful.createClient({
    accessToken: process.env.NEXT_PUBLIC_CMA_TOKEN,
  });

  const space = await client.getSpace(process.env.NEXT_PUBLIC_SPACE_TOKEN);

  const env = await space.getEnvironment(process.env.NEXT_PUBLIC_ENV_ID);
  const uniqueID: string = uuid();

  const entryFields = {
    id: {
      "en-US": uniqueID,
    },
    title: {
      "en-US": title,
    },
    author: {
      "en-US": author,
    },
    description: {
      "en-US": description,
    },
  };

  const contentType: string = process.env.NEXT_PUBLIC_CONTENT_TYPE;

  var entry;
  var status: string = "success";
  try {
    entry = await env.createEntry(contentType, { fields: entryFields });
    entry = await entry.publish();
  } catch (error) {
    console.error(error);
    status = "error";
  }

  return { status, blogID: entry?.sys.id };
}
