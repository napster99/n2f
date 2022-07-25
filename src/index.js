import { getAllDomNodes } from "lib";

class N2f {
  constructor(options) {
    this.options = options || {};
    this.domArr = []
  }

  init() {
    getAllDomNodes(document.body, this.domArr)
  }

  resetFocus(from = 0) {}

}

export default N2f;
