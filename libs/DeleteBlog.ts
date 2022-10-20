const contentful = require("contentful-management");

export async function deleteBlog(id: string) {
  const client = contentful.createClient({
    accessToken: process.env.NEXT_PUBLIC_CMA_TOKEN,
  });

  const space = await client.getSpace(process.env.NEXT_PUBLIC_SPACE_TOKEN);

  const env = await space.getEnvironment(process.env.NEXT_PUBLIC_ENV_ID);

    var entry;
    var status:string = "success";
    try {
      entry = await env.getEntry(id)
      entry = await entry.unpublish();
      entry = await entry.delete()
    } catch {
      console.error();
      status = "error"
    }
    return status;
}
