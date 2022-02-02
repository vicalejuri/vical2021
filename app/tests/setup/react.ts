/** React browser environment */
import { JSDOM } from "jsdom";
import React from "react";
import { render as reactRender, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

const { window } = new JSDOM("<main></main>");

export function setup() {
  // @ts-ignore
  global.window = window;
  global.document = window.document;
  global.navigator = window.navigator;
  global.getComputedStyle = window.getComputedStyle;
  global.requestAnimationFrame = (cb) => 0;
}

export function reset() {
  window.document.title = "";
  window.document.head.innerHTML = "";
  window.document.body.innerHTML = "<main></main>";
}

/**
 * @typedef RenderOutput
 * @property container {HTMLElement}
 * @property component {React.ReactElement}
 */

/**
 * React render
 * @return {RenderOutput}
 */
export function render(component: JSX.Element, props = {}) {
  const container = window.document.querySelector("main");
  reactRender(component, container);
  return { container, component };
}

/**
 * dispatchEvent
 * @param {HTMLElement} elem
 * @param {String} event
 * @param {any} [details]
 */
export async function fire(elem: HTMLElement, event: string, details: any) {
  await act(() => {
    let evt = new window.Event(event, details);
    elem.dispatchEvent(evt);
  });
}
