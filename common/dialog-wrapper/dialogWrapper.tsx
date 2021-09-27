import React, { MouseEventHandler, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogProps,
  DialogTitleProps,
} from "@material-ui/core";
import styles from "./dialogWrapper.module.scss";
import { DialogContentProps } from "@material-ui/core";

interface DialogWrapperProps extends DialogProps {
  dialogContentProps?: DialogContentProps;
  dialogTitleProps?: DialogTitleProps;
  isfullScreen?: boolean;
  Title?: React.ElementType;
  onClose: MouseEventHandler<HTMLImageElement>;
  fullHeightDialog?: boolean;
}

const DialogWrapper: React.FC<DialogWrapperProps> = ({
  isfullScreen = false,
  children,
  onClose,
  Title,
  open,
  dialogContentProps,
  dialogTitleProps,
  fullHeightDialog = false,
  ...rest
}) => {
  const [fullScreen, setFullScreen] = useState(false);

  const expand = () => {
    setFullScreen(!fullScreen);
  };

  return (
    <div className="dialod-wrapper">
      <Dialog
        PaperProps={{
          style: fullHeightDialog
            ? {
                maxHeight: "100%",
                height: "100%",
                borderRadius: "0px",
                maxWidth: "792px",
                width: "100%",
              }
            : {
                maxHeight: "100%",
                borderRadius: "0px",
                maxWidth: "792px",
                width: "100%",
              },
        }}
        open={open}
        onClose={onClose}
        maxWidth={false}
        fullScreen={fullScreen}
        {...rest}
        fullWidth={false}
      >
        {Title ? (
          <DialogTitle
            {...dialogTitleProps}
            className={
              fullScreen
                ? styles["dialog-header"]
                : `${styles["dialog-header"]} ${styles["dialog-header-width"]}`
            }
          >
            <Title
              isfullScreen={isfullScreen}
              handleClose={onClose}
              expand={expand}
            />
          </DialogTitle>
        ) : (
          <></>
        )}
        <DialogContent
          {...dialogContentProps}
          className={
            fullScreen
              ? styles["dialog-content"]
              : `${styles["dialog-content"]} ${styles["dialog-header-width"]}`
          }
        >
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogWrapper;
