import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import ReactCrop, {
  centerCrop,
  convertToPercentCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from 'react-image-crop';
import { useDebounceEffect, useHandleState } from '../../../hooks';
import { Input, T } from '../../atoms';
import { canvasPreview } from './canvasPreview';
import { ImageLoaderCropperProps } from './types';

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export const ImageLoaderCropper = (props: ImageLoaderCropperProps) => {
  
  const {
    defaultCrop,
    onCropChange,
    aspect: initialAspect,
    scale: initialScale,
    rotate: initialRotate,
    circularCrop,
    withAspect,
    withRotate,
    withScale,
  } = props;
  
  const [ imgSrc, setImgSrc ] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [ crop, setCrop ] = useState<Crop | undefined>(defaultCrop);
  const [ completedCrop, setCompletedCrop ] = useState<PixelCrop>();
  const [ scale, setScale ] = useHandleState(1, initialScale);
  const [ rotate, setRotate ] = useHandleState(0, initialRotate);
  const [ aspect, setAspect ] = useState<number | undefined>(initialAspect || undefined);
  const [ aspectText, setAspectText ] = useState<string>((aspect || '') + '');
  
  const updateAspect = (aspect: number | undefined) => {
    if (!aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(aspect);
      const crop = centerAspectCrop(width, height, aspect);
      setCrop(crop);
      setCompletedCrop(convertToPixelCrop(crop, width, height));
    }
  };
  useEffect(() => {
    updateAspect(initialAspect);
    setAspectText((initialAspect || '') + '');
  }, [ initialAspect ]);
  useEffect(() => updateAspect(aspect), [ aspect ]);
  
  function onSelectFile(files: FileList) {
    if (files?.length > 0 && files[0]) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      );
      reader.readAsDataURL(files[0]);
    }
  }
  
  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    if (aspect) {
      setCrop(centerAspectCrop(width, height, aspect));
    } else {
      setCrop({ width: 100, height: 100, y: 0, x: 0, unit: '%' });
    }
  }
  
  useDebounceEffect(async () => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      // We use canvasPreview as it's much faster than imgPreview.
      await canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        scale,
        rotate,
      );
    }
  }, 100, [ completedCrop, scale, rotate ]);
  
  useEffect(() => {
    if (previewCanvasRef.current && completedCrop && imgRef.current) {
      const { width, height } = imgRef.current;
      onCropChange?.({
        percentCrop: convertToPercentCrop(completedCrop, width, height),
        pixelCrop: completedCrop,
        previewCanvasRef: previewCanvasRef,
        scale,
        rotate,
        circularCrop: !!circularCrop,
        aspect,
      });
    }
  }, [ completedCrop, scale, rotate, onCropChange, circularCrop, aspect ]);
  
  return (
    <div className="image-loader-cropper-layout jk-col gap">
      <div className="jk-row space-between gap nowrap">
        <Input type="file" accept="image/*" onChange={onSelectFile} />
        {withScale && (
          <Input
            labelPlacement="left"
            label={<T className="tt-se">scale</T>}
            type="number"
            step={0.1}
            value={scale}
            disabled={!imgSrc}
            size="auto"
            onChange={setScale}
          />
        )}
        {withRotate && (
          <Input
            labelPlacement="left"
            label={<T className="tt-se">rotate</T>}
            type="number"
            value={rotate}
            disabled={!imgSrc}
            size="auto"
            onChange={value => setRotate(Math.min(180, Math.max(-180, value)))}
          />
        )}
        {withAspect && (
          <Input
            labelPlacement="left"
            label={<T className="tt-se">aspect</T>}
            type="text"
            value={aspectText}
            disabled={!imgSrc}
            size="auto"
            onChange={value => {
              setAspectText(value);
              const values = value?.split('/');
              const aspect = +(values[0] ?? 0) / +(values[1] ?? 1);
              if (!Number.isNaN(aspect)) {
                setAspect(aspect);
              }
            }}
          />
        )}
      </div>
      {Boolean(imgSrc) && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          circularCrop={circularCrop}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      <div style={{ display: 'none' }}>
        {!!completedCrop && (<canvas ref={previewCanvasRef} />)}
      </div>
    </div>
  );
};
