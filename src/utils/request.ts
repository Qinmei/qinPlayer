import { fetch as fetchPolyfill } from 'whatwg-fetch';

const fetch: (url: string) => Promise<any> = (url: string) => fetchPolyfill(url);

export default fetch;
