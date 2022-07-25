/**
 *
 * @param {*} root
 */

export function getAllDomNodes(root = document.body, domArr = [], filterElementTagName) {
  if (root) {
    // 元素节点
    if (root.nodeType === 1) {
      if (!filterElementTagName || root.tagName === filterElementTagName) {
        domArr.push(root);
      }
      if (root.hasChildNodes()) {
        getAllDomNodes(root.childNodes[0]);
      } else {
        returnBySameRoute(root, getAllDomNodes, "nextElementSibling");
      }
    } else {
      if (root.nextElementSibling) {
        getAllDomNodes(root.nextElementSibling);
      } else {
        returnBySameRoute(root, getAllDomNodes, "nextElementSibling", "parentElement");
      }
    }
  }
}

/**
 *
 * @param {*} root
 * @param {*} searchApi
 * @param {*} $1
 * @param {*} $2
 */
export function returnBySameRoute(
  root,
  searchApi,
  $1 = "nextElementSibling",
  $2 = "parentElement"
) {
  let _root = root;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // 返回上级节点，直至HTML
    if (_root.tagName === "HTML") break;
    if (($3 = $2 ? _root[$2][$1] : _root[$1])) {
      searchApi($3);
      break;
    } else {
      _root = _root.parentElement;
    }
  }
}
