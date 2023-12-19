export const ImageFooter = ({ userHint }: { userHint: string }) => {
  interface ImageProxy {
    [key: string]: JSX.Element;
  }

  const imageProxy: ImageProxy = {
    pedro: <img src="/images/bg/pedro.jpg" alt="custom-bg" />,
    mari: <img src="/images/bg/mari.jpg" alt="custom-bg" />,
    default: <img src="/images/bg/both.jpg" alt="custom-bg" />,
  };

  return (
    <footer className="image-footer">
      {imageProxy[userHint] || imageProxy.default}
    </footer>
  );
};
