import React, { useRef, useEffect } from 'react';
import type { Property } from 'csstype';

import { useMousePosition } from '../../hooks/useMousePosition';
import { useHover } from '../../hooks/useHover';
import { cn, getCSSPropertyValue } from '../../lib/helpers';

import Two from 'two.js';
import { useCycle, useSpring, useTransform } from 'framer-motion';

import style from './RubberBall.module.scss';

export type props = {
  radius?: number;
  drag?: number;
  blendMode?: Property.MixBlendMode;
};

/**
 * Export the types for runtime code-introspection tools
 */
const defaultRubberBallProps: props = {
  radius: 16,
  drag: 0.31,
  blendMode: 'exclusion'
};
export const props = defaultRubberBallProps;

function RubberBallStaticDOM({
  ref,
  blendMode
}: {
  ref: React.MutableRefObject<HTMLDivElement>;
  blendMode: props['blendMode'];
}) {
  return (
    <div
      ref={ref}
      className={cn(style['rubberball-stage'])}
      style={{
        mixBlendMode: blendMode
      }}
    />
  );
}

/**
 * Rubberball is almost a verbatim copy of two.js example rubber ball
 * https://two.js.org/examples/rubber-ball.html.
 */
export default function RubberBall(props: props = defaultRubberBallProps) {
  const stage = useRef<HTMLDivElement>();
  props = { ...props, ...defaultRubberBallProps };

  /** @ts-ignore SSR guard-rail */
  if (import.meta.env.SSR) {
    return RubberBallStaticDOM({ ref: stage, blendMode: props.blendMode });
  }

  var radius = props.radius;
  var drag = props.drag;
  var mousePosition = useMousePosition();

  var two: any = undefined;
  var ball: any = undefined;
  var delta = new Two.Vector();
  var mouse = new Two.Vector(window.innerWidth / 2, window.innerHeight / 2);

  /** Track hover over link elements */
  var hoveredLink = useHover({ selector: 'a[href]' });
  var ballHoverVariants = {
    hover: { scale: 1.5, color: getCSSPropertyValue('--brand') },
    out: { scale: 1, color: getCSSPropertyValue('--nice') }
  };

  var hoverSpring = useSpring(0, { stiffness: 400, damping: 30, bounce: 1.9 });
  var ballScaleSpring = useTransform(
    hoverSpring,
    [0, 1],
    [ballHoverVariants['out'].scale, ballHoverVariants['hover'].scale]
  );
  var ballColorSpring = useTransform(
    hoverSpring,
    [0, 1],
    [ballHoverVariants['out'].color, ballHoverVariants['hover'].color]
  );

  /**
   * Avoid quickly toggling the blend-modes, cancelling transition when hovering adjacent links
   * Delay a little bit until spring crossed the 0 edge to toggle the blend-mode
   */
  var hoverDirection = useTransform(hoverSpring, [0, 1], [-1, 1]);

  function update() {
    mouse.x = mousePosition.current.x;
    mouse.y = mousePosition.current.y;

    /** Hovered over a link, change ball style */
    hoverSpring.set(hoveredLink.current ? 1.0 : 0.0);
    ball.fill = ballColorSpring.get();
    ball.scale = ballScaleSpring.get();
    stage.current.style.mixBlendMode = hoverDirection.get() < 0 ? 'exclusion' : 'overlay';

    delta.copy(mouse).subSelf(ball.translation);
    ball.vertices.forEach((v, i) => {
      let dist = v.origin.distanceTo(delta);
      let pct = dist / radius;

      let x = delta.x * pct;
      let y = delta.y * pct;

      let destx = v.origin.x - x;
      let desty = v.origin.y - y;

      v.x += (destx - v.x) * drag;
      v.y += (desty - v.y) * drag;
    });
    ball.translation.addSelf(delta);
  }

  function setup() {
    two = new Two({
      width: window.innerWidth,
      height: window.innerHeight,
      type: Two.Types['svg']
    }).appendTo(stage.current);

    ball = two.makeCircle(two.width / 2, two.height / 2, radius, 32);
    ball.stroke = '#fff';
    ball.fill = ballHoverVariants['out'].color;
    ball.vertices.forEach((v) => {
      v.origin = new Two.Vector().copy(v);
    });

    two.bind('update', update);
    two.play();

    return () => {
      two.pause();
      stage?.current?.removeChild(two.renderer.domElement);
    };
  }

  useEffect(setup, []);

  return RubberBallStaticDOM({ ref: stage, blendMode: props.blendMode });
}
