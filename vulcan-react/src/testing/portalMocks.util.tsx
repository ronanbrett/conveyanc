export function createTopNavPortalMock() {
  let modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "topNavPortal");
  document.querySelector("body")!.appendChild(modalRoot);
}
