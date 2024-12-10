import withNuxt from './.playground/.nuxt/eslint.config.mjs';
import igorjacauna from '@igorjacauna/eslint-config/basic';
import igorVue from '@igorjacauna/eslint-config/vue';

export default withNuxt(igorjacauna(igorVue([{
  rules: {
    'no-undef': 'off',
  },
}])));
