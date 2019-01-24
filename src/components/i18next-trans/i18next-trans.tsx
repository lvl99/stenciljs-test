import { Component, Prop } from "@stencil/core";
import Tunnel from "../../data/i18next-state";

@Component({
  tag: "i18next-trans"
})
export class I18nextTrans {
  @Prop() key: string;
  @Prop() defaultText: string = "";
  @Prop() values: object = {};
  @Prop() lng: string;

  render() {
    return (
      <Tunnel.Consumer>
        {({ t }) => {
          console.log("i18n-trans", {
            t,
            key: this.key,
            values: this.values,
            lng: this.lng
          });
          return t(this.key, {
            defaultValue: this.defaultText,
            replace: this.values,
            lng: this.lng
          });
        }}
      </Tunnel.Consumer>
    );
  }
}
