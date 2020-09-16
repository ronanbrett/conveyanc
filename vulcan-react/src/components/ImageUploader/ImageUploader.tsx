import { S3Level, S3ObjectArgs } from "@core/api/graphql";
import { Storage } from "@services/aws.service";
import classNames from "classnames";
import { IconButton } from "@components";
import { FieldConfig, useField } from "formik";
import { reduce } from "lodash-es";
import React, { FC, useEffect, useState } from "react";
import { empty, forkJoin, from, Subject } from "rxjs";
import { catchError, map, scan, switchMap } from "rxjs/operators";
import ImageUploading from "./ImageUploader.base";
import "./ImageUploader.scss";

interface ImageI extends Partial<S3ObjectArgs> {
  data_url?: string;
  file?: File;
  id?: string;
  index?: number;
  failed?: boolean;
  pending?: boolean;
  complete?: boolean;
}

interface ImageUploaderProps {
  children?: any;
}

const ImageUploader: FC<ImageUploaderProps & FieldConfig> = ({ ...props }) => {
  const [field, meta, helpers] = useField(props);

  const [images, setImages] = React.useState([]);
  const [imageUploadMap, setImageUploadMap] = useState<any>({});

  const [uploadQueue$] = useState(() => {
    // Arrow function is used to init Singleton Subject. (in a scope of a current component)
    return new Subject<any>();
  });

  useEffect(() => {
    if (field.value && field.value.length) {
      const vals = reduce(
        field.value,
        (accum: any, field: any) => {
          accum[field.key] = {
            ...field,
            complete: true,
            id: field.key,
          };
          return accum;
        },
        {}
      );

      const images = field.value.map((field: any) => ({
        ...field,
        id: field.key,
      }));
      setImageUploadMap(vals);
      setImages(images);
    }
  }, []);

  useEffect(() => {
    const completedImages = reduce(
      images,
      (accum: ImageI[], image: ImageI) => {
        const mappedImg = imageUploadMap[image.id];
        if (mappedImg && mappedImg.complete) {
          const { key, level, directory, bucket, region } = mappedImg;
          const img = {
            key,
            level,
            directory,
            bucket,
            region,
            data_url: image.data_url,
          };
          accum.push(img);
        }
        return accum;
      },
      []
    );

    helpers.setValue(completedImages);
  }, [images, imageUploadMap]);

  useEffect(() => {
    const DIRECTORY = "property";
    const subscription = uploadQueue$
      .pipe(
        switchMap((images: ImageI[]) =>
          forkJoin(
            images.map((image) =>
              from(
                Storage.put(`${DIRECTORY}/${image.id}`, image.file, {
                  level: "public",
                }).catch((err) => {
                  image.failed = true;
                  return image;
                })
              ).pipe(
                map((res) => ({
                  ...res,
                  id: image.id,
                  key: `${DIRECTORY}/${image.id}`,
                  level: S3Level.Public,
                  region: CONFIG.AWS.REGION,
                  bucket: CONFIG.AWS.S3.BUCKET,
                  pending: false,
                  complete: true,
                })),
                catchError((err, obs) => {
                  return empty();
                })
              )
            )
          )
        ),
        scan((accum: any, images: ImageI[]) => {
          const statusMap = reduce(
            images,
            (accum: any, image, index) => {
              accum[image.id] = image;
              return accum;
            },
            {}
          );

          accum = { ...accum, ...statusMap };

          return accum;
        }, {})
      )
      .subscribe((images: ImageI[]) => {
        setImageUploadMap(images);
      });

    return () => {
      // On Component destroy. notify takeUntil to unsubscribe from current running ajax request
      // unsubscribe filter change listener
      subscription.unsubscribe();
    };
  }, []);

  const maxNumber = 16;
  const onChange = (imageList: ImageI[], addUpdateIndex?: number[]) => {
    // data for submit
    setImages(imageList);

    if (addUpdateIndex?.length) {
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

            <div className="ImageUploader__images">
              {imageList.map((image: any, index) => {
                const state = imageUploadMap[image.id] ?? { pending: true };

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
