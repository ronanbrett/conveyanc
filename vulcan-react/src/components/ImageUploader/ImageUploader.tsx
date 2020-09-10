import React, { FC, useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";

import { Storage } from "@services/aws.service";

import "./ImageUploader.scss";
import IconButton from "components/IconButton";
import classNames from "classnames";

import { v4 } from "uuid";
import { Subject, from, of, forkJoin, empty } from "rxjs";
import {
  mergeMap,
  map,
  switchMap,
  tap,
  zip,
  toArray,
  scan,
  bufferCount,
  zipAll,
  combineLatest,
  mergeAll,
  combineAll,
  catchError,
} from "rxjs/operators";
import { flatMap } from "lodash-es";

interface ImageI {
  data_url?: string;
  file?: File;
  id?: string;
  index?: string;
  failed?: boolean;
}

interface ImageUploaderProps {
  children?: any;
}

const ImageUploader: FC<ImageUploaderProps> = ({ ...props }) => {
  const [images, setImages] = React.useState([]);
  const [uploadState, setUploadState] = React.useState<any>([]);
  const [complete, setComplete] = React.useState<any>([]);

  const [uploadQueue$] = useState(() => {
    // Arrow function is used to init Singleton Subject. (in a scope of a current component)
    return new Subject<any>();
  });

  useEffect(() => {
    // Effect that will be initialized once on a react component init.
    // Define your pipe here.

    let queue = 0;
    const subscription = uploadQueue$
      .pipe(
        switchMap((images: ImageI[]) =>
          forkJoin(
            images.map((image) =>
              from(
                Storage.put(v4(), image.file, {
                  level: "protected",
                  customPrefix: "property",
                }).catch((err) => {
                  image.failed = true;
                  return image;
                })
              ).pipe(
                map((res) => ({
                  ...res,
                  ...image,
                  pending: false,
                  complete: true,
                })),
                catchError((err, obs) => {
                  console.log(err, obs);
                  return empty();
                })
              )
            )
          )
        )
      )
      .subscribe((image: any) => {
        setUploadState(image);
      });

    return () => {
      // On Component destroy. notify takeUntil to unsubscribe from current running ajax request
      uploadQueue$.next("");
      // unsubscribe filter change listener
      subscription.unsubscribe();
    };
  }, []);

  const maxNumber = 69;
  const onChange = (imageList: ImageI[], addUpdateIndex?: number[]) => {
    // data for submit
    setImages(imageList);

    if (addUpdateIndex.length) {
      uploadQueue$.next(
        addUpdateIndex.map((index) => ({ ...imageList[index], index }))
      );
    }
  };

  return (
    <div className="ImageUploader">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="ImageUploader__wrapper">
            <button
              className="ImageUploader__drop"
              type="button"
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            {/* <button type="button" onClick={onImageRemoveAll}>
              Remove all images
            </button> */}

            <div className="ImageUploader__images">
              {imageList.map((image: any, index) => {
                const state = uploadState[index] ?? { pending: true };
                console.log(state);

                const cx = classNames({
                  ImageUploader__image: true,
                  "ImageUploader--FAILED": state.failed,
                  "ImageUploader--PENDING": state.pending,
                  "ImageUploader--complete": state.complete,
                });
                return (
                  <div key={index} className={cx}>
                    <img src={image.data_url} alt="" />
                    <div className="ImageUploader__image-actions">
                      <IconButton
                        size="mini"
                        icon="delete"
                        onClick={() => onImageRemove(index)}
                      ></IconButton>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
