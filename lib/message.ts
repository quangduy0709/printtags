enum MessType {
  Info = "info",
  Error = "error",
  Success = "success",
  Warning = "warning",
}

const icon = {
  success: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`,
  error: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
</svg>`,
};

class Message {
  private containerElem: HTMLDivElement | undefined;
  constructor() {
    this.createContainer();
  }

  private createContainer() {
    let containerElem = document.querySelector(
      "#message-wrapper"
    ) as HTMLDivElement;
    if (!containerElem) {
      const node = document.createElement("div");
      node.id = "message-wrapper";
      document.body.appendChild(node);
      containerElem = document.querySelector(
        "#message-wrapper"
      ) as HTMLDivElement;
    }

    this.containerElem = containerElem;
  }

  private generate(type: MessType, content: string) {
    const node = document.createElement("div");
    node.classList.add(`message`, `${type}`);
    node.innerHTML = `
        <div>${icon[type]}</div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">${content}</p>
        </div>`;

    this.containerElem?.appendChild(node);
    this.destroyAfterAnimationEnd(node);
  }

  private destroyAfterAnimationEnd(node: HTMLDivElement) {
    node.addEventListener("transitionend", () => {
      node.remove();
    });
    setTimeout(() => {
      node.classList.add("out");
    }, 3000);
  }

  info(content: string) {
    this.generate(MessType.Info, content);
  }
  success(content: string) {
    this.generate(MessType.Success, content);
  }
  error(content: string) {
    this.generate(MessType.Error, content);
  }
  warning(content: string) {
    this.generate(MessType.Warning, content);
  }
}

let messageInstance: Message;

const getInst = () => {
  if (!messageInstance) {
    messageInstance = new Message();
  }

  return messageInstance;
};

export const minfo = (content: string): void => {
  getInst().info(content);
};
export const msuccess = (content: string): void => {
  getInst().success(content);
};
export const merror = (content: string): void => {
  getInst().error(content);
};
export const mwarning = (content: string): void => {
  getInst().warning(content);
};
