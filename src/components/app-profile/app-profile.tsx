import { Component, Prop, State, Element } from "@stencil/core";
import { MatchResults } from "@stencil/router";

@Component({
  tag: "app-profile",
  styleUrl: "app-profile.css",
  shadow: true
})
export class AppProfile {
  @Element() el: HTMLElement;
  @Prop() match: MatchResults;
  @State() signatureValue: string = "";

  normalize(name: string): string {
    if (name) {
      return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
    }
    return "";
  }

  handleInputSignatureChange = (event: CustomEvent) => {
    this.signatureValue = event.detail;
  };

  render() {
    if (this.match && this.match.params.name) {
      return (
        <div class="app-profile">
          <p>
            Hello! My name is {this.normalize(this.match.params.name)}. My name
            was passed in through a route param!
            <my-component a={1} />
          </p>

          <input-signature
            onChange={this.handleInputSignatureChange}
            onClear={() => alert("Cleared!")}
          />

          {this.signatureValue && (
            <div class="output-signature">{this.signatureValue}</div>
          )}

          <i18next-trans
            key="example1"
            defaultText="Something goes here for 1."
          />
          <i18next-trans
            key="example2"
            defaultText="Something goes here for 2."
          />
          <i18next-trans
            key="example3"
            defaultText="Something goes here for 3."
          />

          <i18next-provider lng="fr">
            <i18next-trans
              key="example1"
              defaultText="Something goes here for 1."
            />
            <i18next-trans
              key="example2"
              defaultText="Something goes here for 2."
            />
            <i18next-trans
              key="example3"
              defaultText="Something goes here for 3."
            />
          </i18next-provider>
        </div>
      );
    }
  }
}
