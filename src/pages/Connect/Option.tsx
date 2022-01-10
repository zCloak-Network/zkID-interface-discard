/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-16 16:29:16
 * @LastEditTime: 2022-01-10 10:29:33
 */
import React from "react";

export default function Option({
  link = null,
  clickable = true,
  size,
  onClick = null,
  color,
  header,
  subheader = null,
  icon,
  active = false,
  id,
}: {
  link?: string | null;
  clickable?: boolean;
  size?: number | null;
  onClick?: null | (() => void);
  color: string;
  header: React.ReactNode;
  subheader: React.ReactNode | null;
  icon: string;
  active?: boolean;
  id: string;
}): React.ReactNode {
  const content = "content";

  // if (link) {
  //   return <ExternalLink href={link}>{content}</ExternalLink>;
  // }

  return content;
}
