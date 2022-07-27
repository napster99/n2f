import { getAllDomNodes } from "./lib";

const __N2FID__ = "__n2fid__";
const FocusElement = Object.freeze(["INPUT", "TEXTAREA"]);

/**
 * options
 *  |- root
 *  |- domArr
 *  |- filterElementTagName
 *  |- rules
 *      |- skipNull 跳过有值输入框
 *      |- delay 延迟聚焦  默认: 100ms
 *      |- pIndex 游标指针 默认: 0
 */
class N2f {
  constructor({
    root,
    domArr,
    filterElementTagName = FocusElement,
    rules = {},
    ...reset
  }) {
    try {
      this.options = {
        root,
        domArr,
        filterElementTagName,
        rules,
        ...reset,
      };
      this.pIndex = rules.pIndex || 0;
      this.domArr = this.options.domArr || [];
      this.init();
      this.bindListener();
    } catch (e) {
      throw Error(e.message);
    }
  }

  init() {
    getAllDomNodes(
      this.options.root,
      this.domArr,
      this.options.filterElementTagName
    );
    this.domArr.map((item, index) =>
      FocusElement.includes(item.tagName)
        ? item.setAttribute(__N2FID__, index)
        : null
    );
    this.domArr[this.pIndex] && this.domArr[this.pIndex].focus();
  }

  bindListener() {
    window.addEventListener(
      "keydown",
      (e) => {
        if (e.keyCode === 13) {
          this.injectRules();
        }
      },
      false
    );

    window.addEventListener(
      "click",
      (e) => {
        const curIndex = e.target.getAttribute(__N2FID__);
        if (curIndex) {
          this.resetFocus(curIndex);
        }
      },
      false
    );
  }

  injectRules(pIndex) {
    this.pIndex = pIndex || this.pIndex || 0;
    if (this.options.rules.skipNull) {
      while (true) {
        if (!this.domArr[this.pIndex++]["value"]) break;
        if (this.pIndex === this.domArr.length) break;
      }
    } else {
      this.pIndex =
        this.pIndex === this.domArr.length - 1
          ? this.domArr.length - 1
          : ++this.pIndex;
    }
    while (true) {
      if (!this.domArr[this.pIndex].hasAttribute("disabled")) break;
      if (this.pIndex === this.domArr.length) break;
      this.pIndex = ++this.pIndex;
    }
    this.domArr[this.pIndex].focus();
  }

  resetFocus(resetIndex = 0) {
    this.pIndex = resetIndex;
  }
}

export default N2f;
