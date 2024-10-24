import DefaultTheme from 'vitepress/theme';
import './style/custom.css';
import homeMore from './components/homeMore.vue';
import MyLayout from './components/MyLayout.vue';
export default {
    ...DefaultTheme,
    // extends: DefaultTheme,
    Layout: MyLayout,
    enhanceApp({ app, router, siteData }) {
        app.component('homeMore', homeMore);
    }
};
