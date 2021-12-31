/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-23 18:20:26
 * @LastEditTime: 2021-12-24 17:06:10
 */

import React, { useCallback, useEffect } from "react";

import { PopupContent } from "../../state/application/reducer";
import TransactionPopup from "./TransactionPopup";
// import { XIcon } from "@heroicons/react/outline";
import { animated, useSpring } from "react-spring";
import { useRemovePopup } from "../../state/application/hooks";

const AnimatedFader = animated(({ children, ...rest }) => (
  <div className="h-[3px] bg-dark-800 w-full">
    <div className="h-[3px] bg-gradient-to-r from-yellow to-yellow " {...rest}>
      {children}
    </div>
  </div>
));

export default function PopupItem({
  removeAfterMs,
  content,
  popKey,
}: {
  removeAfterMs: number | null;
  content: PopupContent;
  popKey: string;
}) {
  const removePopup = useRemovePopup();
  const removeThisPopup = useCallback(
    () => removePopup(popKey),
    [popKey, removePopup]
  );
  useEffect(() => {
    if (removeAfterMs === null) return undefined;

    const timeout = setTimeout(() => {
      removeThisPopup();
    }, removeAfterMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [removeAfterMs, removeThisPopup]);

  let popupContent;
  if ("txn" in content) {
    const {
      txn: { hash, title, success, summary },
    } = content;
    popupContent = (
      <TransactionPopup
        title={title}
        hash={hash}
        success={success}
        summary={summary}
      />
    );
  }

  const faderStyle = useSpring({
    from: { width: "100%" },
    to: { width: "0%" },
    config: { duration: removeAfterMs ?? undefined },
  });

  return (
    <div>
      <div>
        <div>
          {popupContent}
          <div>
            {/* <XIcon width={24} height={24} onClick={removeThisPopup} /> */}
          </div>
        </div>
        {removeAfterMs !== null ? <AnimatedFader style={faderStyle} /> : null}
      </div>
    </div>
  );
}
