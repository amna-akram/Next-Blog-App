import { Blog } from "./interfaces";

const contentful = require("contentful-management");

export async function updateBlog({ id, title, author, description }: Blog) {
  const client = contentful.createClient({
    accessToken: process.env.NEXT_PUBLIC_CMA_TOKEN,
  });

  const space = await client.getSpace(process.env.NEXT_PUBLIC_SPACE_TOKEN);

  const env = await space.getEnvironment(process.env.NEXT_PUBLIC_ENV_ID);

  var entry;
  var status: string = "success";
  try {
    entry = await env.getEntry(id);
    entry.fields.title["en-US"] = title;
    entry.fields.author["en-US"] = author;
    entry.fields.description["en-US"] = description;
    entry = await entry.update();
    entry = await entry.publish();
  } catch {
    console.error();
    status = "error";
  }
  return status;
}
