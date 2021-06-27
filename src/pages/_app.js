import { wrapper } from "@/src/store";

import "@/src/styles/main.scss";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(App);
