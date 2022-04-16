import React, { useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import { Button } from '../../Button';
import { MinusIcon, PlusIcon } from '../../graphics';
import { Input } from '../../Input';
import { CroppedImageType, ImageLoaderAndCropperProps } from './types';

export const ImageLoaderAndCropper = ({ defaultCrop, action }: ImageLoaderAndCropperProps) => {
  const initialCrop = defaultCrop || {
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  };
  const [crop, setCrop] = useState<Crop>(initialCrop);
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [src, setSrc] = useState<string | ArrayBuffer | null>(null);
  const [croppedImage, setCroppedImage] = useState<CroppedImageType>({ url: '', blob: null });
  const [scale, _setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const setScale = (value: number) => _setScale(Math.max(Math.round(value * 10) / 10, 0.1));
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imageRef.current) {
      return;
    }
    
    const image = imageRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;
    
    const scaleX = image.naturalWidth / image.width * (1 / scale);
    const scaleY = image.naturalHeight / image.height * (1 / scale);
    const ctx = canvas.getContext('2d');
    const pixelRatio = window?.devicePixelRatio;
    
    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;
    
    ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx && (ctx.imageSmoothingQuality = 'high');
    const ox = (image.width - (image.width * scale)) / 2;
    const oy = (image.height - (image.height * scale)) / 2;
    const sx = crop.x * scaleX - ox * scaleX;
    const sy = crop.y * scaleY - oy * scaleY;
    
    ctx?.drawImage(
      image,
      sx,
      sy,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        const fileUrl = window?.URL.createObjectURL(blob);
        setCroppedImage({ url: fileUrl, blob });
      },
      'image/png',
      1,
    );
  }, [completedCrop, scale, rotate]);
  
  // const onImageLoaded = useCallback((img: any) => imageRef.current = img, []);
  
  const onSelectFile = ({ target }: { target: HTMLInputElement }) => {
    if (target.files && target.files.length > 0) {
      setRotate(0);
      setScale(1);
      setCrop(initialCrop);
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(target.files[0]);
    }
  };
  
  return (
    <div className="load-crop-image">
      <div className="actions-container jk-row space-between gap">
        <input type="file" accept="image/*" onChange={onSelectFile} />
        <div className="actions-box">
          {action(croppedImage)}
        </div>
      </div>
      {src && (
        <div className="jk-row start gap image-utils">
          <div className="jk-row">
            scale:
            <Button
              size="small"
              type="text"
              icon={<PlusIcon circle />}
              onClick={() => setScale(scale + 0.1)} />
            <Input onChange={value => setScale(value)} value={scale} type="number" />
            <Button
              size="small"
              type="text"
              icon={<MinusIcon circle />}
              onClick={() => setScale(scale - 0.1)}
            />
          </div>
          <div className="jk-row">
            rotate: <Button size="small" type="text" icon={<PlusIcon circle />}
                            onClick={() => setRotate(prevState => prevState + 1)} />
            <Input onChange={(value) => setRotate(value)} value={rotate} type="number" />
            <Button size="small" type="text" icon={<MinusIcon circle />} onClick={() => setRotate(prevState => prevState - 1)} />
          </div>
        </div>
      )}
      <div className="crop-preview-box">
        <div className="crop-box">
          <div>
            <ReactCrop
              // src={src as string}
              crop={crop}
              // onImageLoaded={onImageLoaded}
              onComplete={crop => setCompletedCrop(crop)}
              onChange={crop => setCrop(crop)}
              // scale={scale}
              // rotate={rotate}
              ruleOfThirds
            >
              <img
                src={src as string}
                crossOrigin="anonymous"
                alt="cropping"
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              />
            </ReactCrop>
          </div>
        </div>
        <div className="preview-box">
          <canvas ref={previewCanvasRef} />
          {/*// <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImage.url} />*/}
        </div>
      </div>
    </div>
  );
};

export * from './types';
