/**
 *
 * @param {*} root
 */

export function getAllDomNodes(
  root = document.body,
  domArr = [],
  filterElementTagName,
  blockRoot
) {
  if (root) {
    blockRoot = blockRoot || root;

    // 元素节点
    if (root.nodeType === 1) {
      if (
        !filterElementTagName ||
        filterElementTagName.includes(root.tagName)
      ) {
        domArr.push(root);
        root.style.border = "1px solid red";
      }
    }

    const nextRoot =
      root.nodeType === 1 ? root.childNodes[0] : root.nextElementSibling;
    const argString = root.nodeType === 1 ? "" : "parentElement";
    if (nextRoot) {
      getAllDomNodes(nextRoot, domArr, filterElementTagName, blockRoot);
    } else {
      returnBySameRoute(
        root,
        { getAllDomNodes, domArr, filterElementTagName, blockRoot },
        "nextElementSibling",
        argString
      );
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
  { getAllDomNodes, domArr, filterElementTagName, blockRoot },
  $1 = "nextElementSibling",
  $2
) {
  let _root = root,
    $3 = null;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // 返回上级节点，直至HTML
    if (_root.tagName === (blockRoot.tagName || "BODY")) break;
    if (($3 = $2 ? _root[$2][$1] : _root[$1])) {
      getAllDomNodes($3, domArr, filterElementTagName, blockRoot);
      break;
    } else {
      _root = _root.parentElement;
    }
  }
}
