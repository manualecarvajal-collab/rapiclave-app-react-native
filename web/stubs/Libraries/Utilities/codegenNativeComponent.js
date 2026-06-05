import React from 'react';

function mergeStyles(style) {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.filter(Boolean));
  }
  if (style && typeof style === 'object') {
    return style;
  }
  return {};
}

export default function codegenNativeComponent(name) {
  return React.forwardRef((props, ref) => {
    React.useEffect(() => {
      if (props.onInsetsChange) {
        props.onInsetsChange({
          nativeEvent: {
            insets: { top: 0, right: 0, bottom: 0, left: 0 },
            frame: {
              x: 0,
              y: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            },
          },
        });
      }
    }, []);
    return React.createElement('div', {
      ref,
      style: {
        display: 'flex',
        flexDirection: 'column',
        ...mergeStyles(props.style),
      },
      children: props.children,
    });
  });
}
