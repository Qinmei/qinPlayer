import { fetch as fetchPolyfill } from 'whatwg-fetch';

const fetch: (url: string) => Promise<T> = (url: string) => fetchPolyfill(url);

export default fetch;
