import {
  Component,
  Element,
  Prop,
  State,
  Event,
  EventEmitter
} from "@stencil/core";
import SignaturePad from "signature_pad";

@Component({
  tag: "input-signature",
  styleUrl: "input-signature.css",
  shadow: false
})
export class InputSignature {
  @Element() el: HTMLElement;
  @Prop() value: string = "";
  @State() currentValue: string = "";

  @Event() change: EventEmitter;
  @Event() clear: EventEmitter;

  private canvas: HTMLCanvasElement;
  private signaturePad: SignaturePad;

  componentDidUnload() {
    this.signaturePad = undefined;
  }

  handleClickClear = (event: Event) => {
    event.preventDefault();
    this.signaturePad.clear();
    this.currentValue = "";
    this.clear.emit();
    this.change.emit(this.currentValue);
  };

  handleSignaturePadUpdate = () => {
    const encodedSignature = this.signaturePad.toDataURL("image/svg+xml");

    // Take only the SVG code, not the `data:image/svg+xml,` part
    if (encodedSignature && encodedSignature.split) {
      const a = encodedSignature.split(",")[1];
      if (a) {
        const svg = atob(a);
        this.currentValue = svg;
      }
    } else {
      this.currentValue = "";
    }

    this.change.emit(this.currentValue);
  };

  setCanvasRef = canvas => {
    this.canvas = canvas as HTMLCanvasElement;

    if (!this.signaturePad) {
      this.signaturePad = new SignaturePad(this.canvas, {
        dotSize: 0.5,
        minWidth: 1,
        maxWidth: 1,
        penColor: "rgb(0, 0, 0)",
        onEnd: this.handleSignaturePadUpdate
      });
    }
  };

  render() {
    return (
      <div class="input-signature">
        <button onClick={this.handleClickClear}>Clear signature</button>
        <canvas class="signature-pad" ref={this.setCanvasRef} />
      </div>
    );
  }
}
