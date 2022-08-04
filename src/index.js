import { getAllDomNodes } from "./lib";

const __N2FID__ = "__n2fid__";
const __NF__ = "__nf__";
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
      this.options = {
        root,
        filterElementTagName,
        submitCallback,
        rules,
        ...reset,
      };
      this.pIndex = rules.pIndex || 0; // 当前获取焦点DOM游标
      this.pDom = null; // 当前获取焦点的DOM
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
    });
  }

  bindingListener() {
    this.keyDownFn = (e) => {
      if (e.keyCode === 13) {
        if (this.pIndex + 1 === this.domArr.length || !this.domArr.length) {
          this.options.submitCallback && this.options.submitCallback();
        }
        this.injectRules();
      }
    };
    this.clickFn = (e) => {
      const curIndex = e.target.getAttribute(__N2FID__);
      if (curIndex || curIndex === 0) {
        this.resetFocus(curIndex);
      }
    };
    window.addEventListener("keydown", this.keyDownFn, false);
    window.addEventListener("click", this.clickFn, false);
  }

  unbindListener() {
    window.removeEventListener("keydown", this.keyDownFn);
    window.removeEventListener("click", this.clickFn);
  }

  injectRules(pIndex) {
    if (this.pDom) {
      this.pIndex = ~~this.pDom.getAttribute(__N2FID__);
    }
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
    if (
      this.pIndex > 0 &&
      this.domArr[this.pIndex - 1] &&
      this.domArr[this.pIndex - 1].getAttribute(__NF__)
    ) {
      this.pIndex--;
    }
    if (this.domArr[this.pIndex]) {
      while (true) {
        if (!this.domArr[this.pIndex].hasAttribute("disabled")) break;
        if (this.pIndex + 1 === this.domArr.length) break;
        this.pIndex++;
      }
      this.domArr[this.pIndex].focus();
      this.pDom = this.domArr[this.pIndex];
    }
  }

  resetFocus(resetIndex = 0) {
    this.pIndex = resetIndex;
    this.pDom = this.domArr[resetIndex];
  }
}

export default N2f;
