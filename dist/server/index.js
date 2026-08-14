export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/') {
      url.pathname = '/index.html';
    } else if (url.pathname.endsWith('/')) {
      url.pathname += 'index.html';
    } else if (!url.pathname.includes('.')) {
      url.pathname += '.html';
    }

    const response = await env.ASSETS.fetch(new Request(url.toString(), request));

    if (response.status === 404 && url.pathname !== '/index.html') {
      const fallback = new URL(request.url);
      fallback.pathname = '/index.html';
      return env.ASSETS.fetch(new Request(fallback.toString(), request));
    }

    return response;
  },
};
