/**
 *
 * @param {*} root
 */

export function getAllDomNodes(
  root = document.body,
  domArr = [],
  filterElementTagName
) {
  if (root) {
    // 元素节点
    if (root.nodeType === 1) {
      if (!filterElementTagName || root.tagName === filterElementTagName) {
        domArr.push(root);
        root.style.border = '1px solid red'
      }
      if (root.hasChildNodes()) {
        getAllDomNodes(root.childNodes[0], domArr, filterElementTagName);
      } else {
        returnBySameRoute(
          root,
          { getAllDomNodes, domArr, filterElementTagName },
          "nextElementSibling"
        );
      }
    } else {
      if (root.nextElementSibling) {
        getAllDomNodes(root.nextElementSibling, domArr, filterElementTagName);
      } else {
        returnBySameRoute(
          root,
          { getAllDomNodes, domArr, filterElementTagName },
          "nextElementSibling",
          "parentElement"
        );
      }
    }
  }
}

/**
 *
 * @param {*} root
 * @param {*} param1
 * @param {*} $1
 * @param {*} $2
 */
export function returnBySameRoute(
  root,
  { getAllDomNodes, domArr, filterElementTagName },
  $1 = "nextElementSibling",
  $2
) {
  let _root = root,
    $3 = null;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // 返回上级节点，直至HTML
    if (_root.tagName === "HTML") break;
    if (($3 = $2 ? _root[$2][$1] : _root[$1])) {
      getAllDomNodes($3, domArr, filterElementTagName);
      break;
    } else {
      _root = _root.parentElement;
    }
  }
}
