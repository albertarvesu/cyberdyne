import fetch from 'node-fetch';

export interface IAjaxOptions {
  method: string;
  body?: string;
  headers?: object;
}

export const ajax = (url: string, options: IAjaxOptions) => {
  return fetch(url, { 
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(json => json);
}

export default ajax;