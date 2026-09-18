/// <reference types="@cloudflare/workers-types" />

interface Env {
  ASSETS: Fetcher;
}

const canonicalHost = 'dawid.tziamtzis.com';
const redirectHost = 'david.tziamtzis.com';

export default {
  fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === redirectHost) {
      url.protocol = 'https:';
      url.hostname = canonicalHost;
      url.port = '';

      return Response.redirect(url, 301);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
