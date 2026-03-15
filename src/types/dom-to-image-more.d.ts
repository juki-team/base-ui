declare module 'dom-to-image-more' {
  interface Options {
    bgcolor?: string;
    width?: number;
    height?: number;
    scale?: number;
    style?: Partial<CSSStyleDeclaration>;
    filter?: (node: Node) => boolean;
  }
  const domToImage: {
    toBlob(node: Node, options?: Options): Promise<Blob>;
    toPng(node: Node, options?: Options): Promise<string>;
    toJpeg(node: Node, options?: Options): Promise<string>;
    toSvg(node: Node, options?: Options): Promise<string>;
  };
  export default domToImage;
}
