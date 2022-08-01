import { getAllDomNodes } from "./lib";

const __N2FID__ = "__n2fid__";
const FocusElement = Object.freeze(["INPUT", "TEXTAREA"]);

/**
 * options
 *  |- root
 *  |- domArr // 废弃
 *  |- filterElementTagName
 *  |- submitCallback
 *  |- rules
 *      |- skipNull 跳过有值输入框
 *      |- delay 延迟聚焦  默认: 100ms
 *      |- pIndex 游标指针 默认: 0
 */
class N2f {
  constructor({
    root,
    filterElementTagName = FocusElement,
    rules = {},
    submitCallback,
    ...reset
  }) {
    try {
      console.log("constructor ...");
      this.options = {
        root,
        filterElementTagName,
        submitCallback,
        rules,
        ...reset,
      };
      this.pIndex = rules.pIndex || 0;
      this.domArr = [];
      this.init();
      this.bindingListener();
    } catch (e) {
      throw Error(e.message);
    }
  }

  getDomArr() {
    return this.domArr;
  }

  init() {
    this.bindingDoms();
    this.domArr[this.pIndex] && this.domArr[this.pIndex].focus();
  }

  bindingDoms() {
    this.domArr = [];
    getAllDomNodes(
      this.options.root,
      this.domArr,
      this.options.filterElementTagName
    );
    this.domArr.map((item, index) => {
      FocusElement.includes(item.tagName)
        ? item.setAttribute(__N2FID__, index)
        : null;
      // 记忆上一次位置 TODO
    });
  }

  bindingListener() {
    window.addEventListener(
      "keydown",
      (e) => {
        if (e.keyCode === 13) {
          if (this.pIndex + 1 === this.domArr.length) {
            this.options.submitCallback && this.options.submitCallback();
          }
          this.injectRules();
        }
      },
      false
    );

    window.addEventListener(
      "click",
      (e) => {
        const curIndex = e.target.getAttribute(__N2FID__);
        if (curIndex || curIndex === 0) {
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
      console.log(this.domArr, this.pIndex, this.domArr[this.pIndex]);
      if (!this.domArr[this.pIndex].hasAttribute("disabled")) break;
      if (this.pIndex + 1 === this.domArr.length) break;
      this.pIndex = ++this.pIndex;
    }
    this.domArr[this.pIndex].focus();
  }

  resetFocus(resetIndex = 0) {
    this.pIndex = resetIndex;
  }
}

export default N2f;
