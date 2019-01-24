import { createProviderConsumer } from "@stencil/state-tunnel";

export interface I18nextState {
  currentLng: string;
  t: Function;
  changeLanguage: Function;
}

export default createProviderConsumer<I18nextState>(
  {
    currentLng: "",
    // @ts-ignore: this is a dummy function
    t: (key: string | string[], options?: any): any => key,
    // @ts-ignore: this is a dummy function
    changeLanguage: (lng: string) => {
      console.log(`Changed language to ${lng}`);
    }
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
