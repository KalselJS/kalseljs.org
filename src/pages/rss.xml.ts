import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedEvents from "@utils/getSortedEvents";
import { SITE } from "@config";

export async function GET() {
  const posts = await getCollection("event");
  const sortedEvents = getSortedEvents(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedEvents.map(({ data, slug }) => ({
      link: `events/${slug}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
