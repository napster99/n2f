import { getAllDomNodes } from "./lib";

class N2f {
  constructor(options) {
    this.options = options || {};
    this.domArr = this.options.domArr || []
    this.init();
  }

  init() {
    getAllDomNodes(this.options.root, this.domArr, this.options.filterElementTagName);
  }

  resetFocus(from = 0) {}
}

export default N2f;
