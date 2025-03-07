import React, { FC, ReactElement } from "react";

/**
 * Iterates through children that are typically specified as `props.children`,
 * but only maps over children that are "valid elements".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 */
function mapChildren<P = any>(
  children: P[],
  func: (el: React.ReactElement<P>, index: number) => any
) {
  let index = 0;

  return React.Children.map(children, (child: P) =>
    React.isValidElement<P>(child) ? func(child, index++) : child
  );
}

/**
 * Iterates through children that are "valid elements".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 */
function forEach<P = any>(
  children: P[],
  func: (el: React.ReactElement<P>, index: number) => void
) {
  let index = 0;
  React.Children.forEach(children, (child: P) => {
    if (React.isValidElement<P>(child)) func(child, index++);
  });
}

/**
 * Iterates through children that are "valid elements".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 */
function getByIndex<P = any>(children: P[], index: number): ReactElement {
  const childArray = React.Children.toArray(children);
  return childArray[index] as ReactElement;
}

export { mapChildren, forEach, getByIndex };
