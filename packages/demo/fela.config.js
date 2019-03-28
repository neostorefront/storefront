import extend from 'fela-plugin-extend'
import namedKeys from 'fela-plugin-named-keys'

const namedKeysPlugin = namedKeys({
  desktop: '@media (min-width: 1024px)',
  tablet: '@media (min-width: 560px) and (max-width: 1024px)',
  phone: '@media (min-width: 0px) and (max-width: 560px)',
})

export default {
  plugins: [ extend(), namedKeysPlugin ],
  enhancers: [ /* add your enhancers here */ ],
  devMode: process.env.NODE_ENV !== 'production',
  // ...
}
