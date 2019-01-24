import { Component, Prop, State } from "@stencil/core";

@Component({
  tag: "my-component",
  styleUrl: "my-component.css",
  shadow: true
})
export class MyComponent {
  @Prop() a: number;
  @Prop() b: number;
  @State() aVal: number;
  @State() bVal: number;
  @State() times = 0;

  calc(...numbers: number[]): number {
    return numbers.reduce((acc, i) => acc + i, 0);
  }

  handleChangeInput = (event: Event) => {
    // @ts-ignore
    switch (event.target.name) {
      case "a":
        // @ts-ignore
        this.aVal = parseFloat(event.target.value);
        break;

      case "b":
        // @ts-ignore
        this.bVal = parseFloat(event.target.value);
        break;

      default:
    }
  };

  render() {
    const a = this.aVal || this.a || 0;
    const b = this.bVal || this.b || 0;
    return (
      <div class="my-component">
        How is this even a thing?{" "}
        <input
          type="number"
          name="a"
          value={a}
          onInput={this.handleChangeInput}
        />{" "}
        +{" "}
        <input
          type="number"
          name="b"
          value={b}
          onInput={this.handleChangeInput}
        />{" "}
        = {this.calc(a, b)} (calculated {this.times || 0} time
        {this.times !== 1 ? "s" : ""})
      </div>
    );
  }
}
