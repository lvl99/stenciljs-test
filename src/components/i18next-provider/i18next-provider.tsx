import i18next from "i18next/dist/commonjs";
import Backend from "i18next-xhr-backend/dist/commonjs";
import { Component, Prop, State, Watch } from "@stencil/core";
import Tunnel from "../../data/i18next-state";

@Component({
  tag: "i18next-provider"
})
export class I18nextProvider {
  @Prop({ mutable: true }) i18n: Promise<Function>;
  @Prop({ mutable: true }) lng?: string;
  @Prop() fallbackLng?: string;
  @Prop() ns?: string | string[];
  @Prop() defaultNS?: string;

  @State() currentLng: string;
  @State() trans: Function = (key: string): string => key;

  constructor() {
    // @ts-ignore
    this.i18n = i18next
      .use(Backend)
      .init({
        lng: this.lng,
        fallbackLng: this.fallbackLng,
        ns: this.ns,
        defaultNS: this.defaultNS,
        backend: {
          loadPath: "/assets/locales/{{lng}}/{{ns}}.json"
        }
      })
      .then((t: Function) => {
        console.log("i18next-provider language loaded", {
          i18next,
          t,
          lng: this.lng
        });
        this.currentLng = this.lng || this.fallbackLng;
        this.trans = t;
        return t;
      });
  }

  t = (key: string | string[], options?: any): string => {
    return this.trans(key, options);
  };

  changeLanguage = (lng: string) => {
    if (lng !== this.lng) {
      this.lng = lng;
    }
  };

  @Watch("lng")
  setNewLanguage(newLng: string, oldLng: string) {
    console.log("i18next-provider Updating language...");
    this.i18n = i18next.changeLanguage(newLng).then((t: Function) => {
      console.log("i18next-provider language changed", {
        i18next,
        t,
        oldLng,
        newLng
      });
      this.currentLng = newLng;
      this.trans = t;
      return t;
    });
  }

  render() {
    const i18nextState = {
      currentLng: this.currentLng,
      t: this.t,
      changeLanguage: this.changeLanguage
    };

    console.log("Render i18n-provider", { i18nextState });

    return (
      <Tunnel.Provider state={i18nextState}>
        <slot />
      </Tunnel.Provider>
    );
  }
}
