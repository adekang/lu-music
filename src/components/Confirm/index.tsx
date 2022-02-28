import React, { forwardRef, useImperativeHandle, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./index.scss";

// eslint-disable-next-line react/display-name
const Confirm = forwardRef((props: any, ref) => {
  const [show, setShow] = useState(false);
  const { text, cancelBtnText, confirmBtnText } = props;

  const { handleConfirm } = props;

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
    }
  }));
  return (
    <CSSTransition classNames="confirm-fade" timeout={300} appear={true} in={show}>
      <div
        className="ConfirmWrapper"
        style={{ display: show ? "block" : "none" }}
        onClick={e => e.stopPropagation()}
      >
        <div>
          <div className="confirm_content">
            <p className="text">{text}</p>
            <div className="operate">
              <div className="operate_btn left" onClick={() => setShow(false)}>
                {cancelBtnText}
              </div>
              <div
                className="operate_btn"
                onClick={() => {
                  setShow(false);
                  handleConfirm();
                }}
              >
                {confirmBtnText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
});

export default React.memo(Confirm);
