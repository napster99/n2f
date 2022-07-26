import { getAllDomNodes } from "./lib";

class N2f {
  constructor(options) {
    this.options = options || {};
    this.domArr = this.options.domArr || []
    this.init();
  }

  init() {
    getAllDomNodes(document.body, this.domArr, "INPUT");
    console.log("this.domArr", this.domArr);
  }

  resetFocus(from = 0) {}
}

export default N2f;
