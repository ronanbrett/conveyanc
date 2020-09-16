import { Button, IconButton, Icon, Progress } from "@components";
import { S3Level, S3ObjectArgs } from "@core/api/graphql";
import { useAuth } from "@core/auth";
import { Storage } from "@services/aws.service";

import { Cache } from "aws-amplify";

import { FieldConfig, useField } from "formik";
import { reduce } from "lodash-es";
import React, { FC, useEffect, useState } from "react";
import { empty, forkJoin, from, Subject } from "rxjs";
import { catchError, map, scan, switchMap } from "rxjs/operators";
import { ReactUploadCheckbox } from "./UploadCheckbox.base";

import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

import "./UploadCheckbox.scss";

interface DocumentI extends Partial<S3ObjectArgs> {
  data_url?: string;
  identityId?: string;
  file?: File;
  id?: string;
  index?: number;
  failed?: boolean;
  pending?: boolean;
  complete?: boolean;
}

interface UploadCheckboxProps {
  title?: string;
  subtitle?: string;
  children?: any;
}

const UploadCheckbox: FC<UploadCheckboxProps & FieldConfig> = ({
  title,
  subtitle,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { logout, login, isAuthenticated, user } = useAuth();

  const [documents, setDocuments] = React.useState([]);
  const [documentUploadMap, setDocumentUploadMap] = useState<any>({});

  const [uploadQueue$] = useState(() => {
    // Arrow function is used to init Singleton Subject. (in a scope of a current component)
    return new Subject<any>();
  });

  const onChange = (documentList: DocumentI[], addUpdateIndex?: number[]) => {
    // data for submit
    setDocuments(documentList);

    if (addUpdateIndex?.length) {
      uploadQueue$.next(
        addUpdateIndex.map((index) => ({
          ...documentList[index],
          index,
          identityId: user?.aws?.IdentityId,
        }))
      );
    }
  };

  useEffect(() => {
    const DIRECTORY = "documents";

    const subscription = uploadQueue$
      .pipe(
        switchMap((docs: DocumentI[]) =>
          forkJoin(
            docs.map((document) => {
              return from(
                Storage.put(`${DIRECTORY}/${document.id}`, document.file, {
                  identityId: document.identityId,
                  level: "protected",
                }).catch((err) => {
                  document.failed = true;
                  return document;
                })
              ).pipe(
                map((res) => ({
                  ...res,
                  id: document.id,
                  key: `${DIRECTORY}/${document.id}`,
                  level: S3Level.Protected,
                  region: CONFIG.AWS.REGION,
                  bucket: CONFIG.AWS.S3.BUCKET,
                  pending: false,
                  complete: true,
                })),
                catchError((err, obs) => {
                  return empty();
                })
              );
            })
          )
        ),
        scan((accum: any, documents: DocumentI[]) => {
          const statusMap = reduce(
            documents,
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
      .subscribe((documents: DocumentI[]) => {
        setDocumentUploadMap(documents);
      });

    return () => {
      // On Component destroy. notify takeUntil to unsubscribe from current running ajax request
      // unsubscribe filter change listener
      subscription.unsubscribe();
    };
  }, []);

  const maxNumber = 5;

  const containerAnimation = {
    hidden: { y: "-100% " },
    show: {
      y: -5,
      transition: {
        ease: [0.17, 0.67, 0.83, 0.67],
        delayChildren: 1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, scale: 1.1 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <ReactUploadCheckbox
      multiple
      value={documents}
      onChange={onChange}
      maxNumber={maxNumber}
    >
      {({
        documentList,
        onDocumentUpload,
        onDocumentRemove,
        isDragging,
        dragProps,
      }) => (
        <div className="UploadCheckbox">
          <div
            className="UploadCheckbox__container"
            style={isDragging ? { color: "red" } : null}
            onClick={onDocumentUpload}
            {...dragProps}
          >
            <div className="UploadCheckbox__info">
              <div className="UploadCheckbox__info-header">
                <div className="UploadCheckbox__info-check">
                  {documentList?.length ? (
                    <Icon size="mini" icon="check_box"></Icon>
                  ) : (
                    <Icon icon="check_box_outline_blank"></Icon>
                  )}
                </div>
                <h1>{title}</h1>
                <Button size="small">Upload Document</Button>
              </div>
              {subtitle && <p>{subtitle}</p>}
            </div>
          </div>
          {documentList.length > 0 && (
            <AnimateSharedLayout>
              <motion.div
                variants={containerAnimation}
                initial="hidden"
                animate="show"
                className="UploadCheckbox__queue"
              >
                {documentList.map((document: DocumentI, index) => {
                  console.log(index);
                  const state = documentUploadMap[document.id] ?? {
                    pending: true,
                  };

                  return (
                    <motion.div
                      key={index}
                      layout
                      variants={itemAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="UploadCheckbox__queue-item"
                    >
                      <div className="UploadCheckbox__upload-icon">
                        <Icon size="mini" icon="topic"></Icon>
                      </div>
                      <h2 className="UploadCheckbox__upload-name">
                        {document.file.name}
                      </h2>
                      {state.pending && (
                        <Progress
                          values={[{ value: state.pending ? 50 : 100 }]}
                          indeterminate={state.pending ? true : false}
                          size={25}
                          thickness={4}
                          type="circle"
                        ></Progress>
                      )}
                      {state.complete && (
                        <IconButton
                          onClick={() => onDocumentRemove(index)}
                          icon="close"
                        ></IconButton>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimateSharedLayout>
          )}
        </div>
      )}
    </ReactUploadCheckbox>
  );
};

export default UploadCheckbox;
