declare module 'infinite-scroll' {
  interface InfiniteScrollOptions {
    path?: string | ((pageIndex: number) => string);
    responseType?: string;
    status?: string;
    history?: boolean | string;
    checkLastPage?: boolean;
    onInit?: () => void;
    onRequest?: (url: string, fetchOptions: any) => void;
    onLoad?: (body: any, path: string) => void;
    onError?: (error: Error, path: string) => void;
    onLastPage?: () => void;
    onFinish?: () => void;
  }

  class InfiniteScroll {
    constructor(element: HTMLElement | string, options?: InfiniteScrollOptions);
    loadNextPage(): Promise<void>;
    checkScroll(): void;
    destroy(): void;
  }

  export default InfiniteScroll;
}
