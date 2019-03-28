## Development

To start development server - run:

```
yarn develop
```

This will start Gatsby on port `8089` and traefik proxy on port `8099`.

So you should be able to open website on this URL:

```
http://localhost:8099/
```

## Architecture Overview

This project generates a static version of the storefront for the Magento store running on the specified endpoint
(`gatsby-config.js`).

It communicates with:

- GraphQL API endpoint
- REST API endpoint

Run-time communication with Magento is performed via integrated Venia theme (`src/venia`).

Compile-time communication with Magento is performed via Gatsby plugin.
        