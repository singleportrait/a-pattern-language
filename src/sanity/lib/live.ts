// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.

// import { defineLive } from 'next-sanity';
import { client } from './client';

type ClientFetchProps = {
  query: string;
  params?: Record<string, string>;
  perspective?: string;
  stega?: boolean;
};

// This is temporary; can switch back to the other once it's no longer experimental
export const sanityFetch = async (props: ClientFetchProps) => {
  const data = await client.fetch(props.query, props.params);
  return { data };
};

// export const { sanityFetch, SanityLive } = defineLive({
//   client: client.withConfig({
//     // Live content is currently only available on the experimental API
//     // https://www.sanity.io/docs/api-versioning
//     apiVersion: 'vX',
//   }),
// });
