import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as Presence, e as Primitive, f as useControllableState$1, g as useComposedRefs$1, h as composeEventHandlers, i as createContextScope, a as cn, T as Trigger, k as Title, C as Close, R as React__default, l as Root$1, m as Content$1, n as Portal$1, O as Overlay$1, o as useSearch, u as useNavigate, B as Button, X, p as Separator, b as Skeleton } from "./index-BANSdmlz.js";
import { B as Breadcrumbs } from "./Breadcrumbs-CVN5wbw-.js";
import { P as PropertyCard } from "./PropertyCard-DSEQVi1L.js";
import { u as usePrevious, a as useSize, I as Input } from "./index-HwEbhaYB.js";
import { C as Check, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-LDE1YHN9.js";
import { L as Label } from "./label-BfJvJEcg.js";
import { a as useProperties } from "./use-properties-BY35R6ki.js";
import { s as setPageMeta, g as generateBreadcrumbJsonLD } from "./seo-CK-m768L.js";
import { m as motion } from "./proxy-Clkm2goj.js";
import "./Badge-DH0HCHWw.js";
import "./format-B6hFwB6V.js";
import "./bed-gZtGX9n-.js";
import "./arrow-right-edaG8tiI.js";
import "./chevron-up-Dey2yvMM.js";
import "./useMutation-B9otopnZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m13.5 8.5-5 5", key: "1cs55j" }],
  ["path", { d: "m8.5 8.5 5 5", key: "a8mexj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
];
const SearchX = createLucideIcon("search-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState$1({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs$1(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset2 = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset2);
        return () => form.removeEventListener("reset", reset2);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs$1(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
function __insertCSS(code) {
  if (typeof document == "undefined") return;
  let head = document.head || document.getElementsByTagName("head")[0];
  let style = document.createElement("style");
  style.type = "text/css";
  head.appendChild(style);
  style.styleSheet ? style.styleSheet.cssText = code : style.appendChild(document.createTextNode(code));
}
const DrawerContext = React__default.createContext({
  drawerRef: {
    current: null
  },
  overlayRef: {
    current: null
  },
  onPress: () => {
  },
  onRelease: () => {
  },
  onDrag: () => {
  },
  onNestedDrag: () => {
  },
  onNestedOpenChange: () => {
  },
  onNestedRelease: () => {
  },
  openProp: void 0,
  dismissible: false,
  isOpen: false,
  isDragging: false,
  keyboardIsOpen: {
    current: false
  },
  snapPointsOffset: null,
  snapPoints: null,
  handleOnly: false,
  modal: false,
  shouldFade: false,
  activeSnapPoint: null,
  onOpenChange: () => {
  },
  setActiveSnapPoint: () => {
  },
  closeDrawer: () => {
  },
  direction: "bottom",
  shouldAnimate: {
    current: true
  },
  shouldScaleBackground: false,
  setBackgroundColorOnScale: true,
  noBodyStyles: false,
  container: null,
  autoFocus: false
});
const useDrawerContext = () => {
  const context = React__default.useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawerContext must be used within a Drawer.Root");
  }
  return context;
};
__insertCSS("[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32, .72, 0, 1);animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform,100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform,100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32, .72, 0, 1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true])::after{content:'';position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]::after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not(\n[data-state=closed]\n){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:active,[data-vaul-handle]:hover{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover:hover) and (pointer:fine){[data-vaul-drawer]{user-select:none}}@media (pointer:fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{from{transform:translate3d(0,var(--initial-transform,100%),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform,100%),0)}}@keyframes slideFromTop{from{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}}@keyframes slideFromLeft{from{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}}@keyframes slideFromRight{from{transform:translate3d(var(--initial-transform,100%),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform,100%),0,0)}}");
function isMobileFirefox() {
  const userAgent = navigator.userAgent;
  return typeof window !== "undefined" && (/Firefox/.test(userAgent) && /Mobile/.test(userAgent) || // Android Firefox
  /FxiOS/.test(userAgent));
}
function isMac() {
  return testPlatform(/^Mac/);
}
function isIPhone() {
  return testPlatform(/^iPhone/);
}
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function isIPad() {
  return testPlatform(/^iPad/) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
  return isIPhone() || isIPad();
}
function testPlatform(re) {
  return typeof window !== "undefined" && window.navigator != null ? re.test(window.navigator.platform) : void 0;
}
const KEYBOARD_BUFFER = 24;
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
function chain$1(...callbacks) {
  return (...args) => {
    for (let callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
const visualViewport = typeof document !== "undefined" && window.visualViewport;
function isScrollable(node) {
  let style = window.getComputedStyle(node);
  return /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
}
function getScrollParent(node) {
  if (isScrollable(node)) {
    node = node.parentElement;
  }
  while (node && !isScrollable(node)) {
    node = node.parentElement;
  }
  return node || document.scrollingElement || document.documentElement;
}
const nonTextInputTypes = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
let preventScrollCount = 0;
let restore;
function usePreventScroll(options = {}) {
  let { isDisabled } = options;
  useIsomorphicLayoutEffect(() => {
    if (isDisabled) {
      return;
    }
    preventScrollCount++;
    if (preventScrollCount === 1) {
      if (isIOS()) {
        restore = preventScrollMobileSafari();
      }
    }
    return () => {
      preventScrollCount--;
      if (preventScrollCount === 0) {
        restore == null ? void 0 : restore();
      }
    };
  }, [
    isDisabled
  ]);
}
function preventScrollMobileSafari() {
  let scrollable;
  let lastY = 0;
  let onTouchStart = (e) => {
    scrollable = getScrollParent(e.target);
    if (scrollable === document.documentElement && scrollable === document.body) {
      return;
    }
    lastY = e.changedTouches[0].pageY;
  };
  let onTouchMove = (e) => {
    if (!scrollable || scrollable === document.documentElement || scrollable === document.body) {
      e.preventDefault();
      return;
    }
    let y = e.changedTouches[0].pageY;
    let scrollTop = scrollable.scrollTop;
    let bottom = scrollable.scrollHeight - scrollable.clientHeight;
    if (bottom === 0) {
      return;
    }
    if (scrollTop <= 0 && y > lastY || scrollTop >= bottom && y < lastY) {
      e.preventDefault();
    }
    lastY = y;
  };
  let onTouchEnd = (e) => {
    let target = e.target;
    if (isInput(target) && target !== document.activeElement) {
      e.preventDefault();
      target.style.transform = "translateY(-2000px)";
      target.focus();
      requestAnimationFrame(() => {
        target.style.transform = "";
      });
    }
  };
  let onFocus = (e) => {
    let target = e.target;
    if (isInput(target)) {
      target.style.transform = "translateY(-2000px)";
      requestAnimationFrame(() => {
        target.style.transform = "";
        if (visualViewport) {
          if (visualViewport.height < window.innerHeight) {
            requestAnimationFrame(() => {
              scrollIntoView(target);
            });
          } else {
            visualViewport.addEventListener("resize", () => scrollIntoView(target), {
              once: true
            });
          }
        }
      });
    }
  };
  let onWindowScroll = () => {
    window.scrollTo(0, 0);
  };
  let scrollX = window.pageXOffset;
  let scrollY = window.pageYOffset;
  let restoreStyles = chain$1(setStyle(document.documentElement, "paddingRight", `${window.innerWidth - document.documentElement.clientWidth}px`));
  window.scrollTo(0, 0);
  let removeEvents = chain$1(addEvent(document, "touchstart", onTouchStart, {
    passive: false,
    capture: true
  }), addEvent(document, "touchmove", onTouchMove, {
    passive: false,
    capture: true
  }), addEvent(document, "touchend", onTouchEnd, {
    passive: false,
    capture: true
  }), addEvent(document, "focus", onFocus, true), addEvent(window, "scroll", onWindowScroll));
  return () => {
    restoreStyles();
    removeEvents();
    window.scrollTo(scrollX, scrollY);
  };
}
function setStyle(element, style, value) {
  let cur = element.style[style];
  element.style[style] = value;
  return () => {
    element.style[style] = cur;
  };
}
function addEvent(target, event, handler, options) {
  target.addEventListener(event, handler, options);
  return () => {
    target.removeEventListener(event, handler, options);
  };
}
function scrollIntoView(target) {
  let root = document.scrollingElement || document.documentElement;
  while (target && target !== root) {
    let scrollable = getScrollParent(target);
    if (scrollable !== document.documentElement && scrollable !== document.body && scrollable !== target) {
      let scrollableTop = scrollable.getBoundingClientRect().top;
      let targetTop = target.getBoundingClientRect().top;
      let targetBottom = target.getBoundingClientRect().bottom;
      const keyboardHeight = scrollable.getBoundingClientRect().bottom + KEYBOARD_BUFFER;
      if (targetBottom > keyboardHeight) {
        scrollable.scrollTop += targetTop - scrollableTop;
      }
    }
    target = scrollable.parentElement;
  }
}
function isInput(target) {
  return target instanceof HTMLInputElement && !nonTextInputTypes.has(target.type) || target instanceof HTMLTextAreaElement || target instanceof HTMLElement && target.isContentEditable;
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => refs.forEach((ref) => setRef(ref, node));
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
const cache = /* @__PURE__ */ new WeakMap();
function set(el, styles, ignoreCache = false) {
  if (!el || !(el instanceof HTMLElement)) return;
  let originalStyles = {};
  Object.entries(styles).forEach(([key, value]) => {
    if (key.startsWith("--")) {
      el.style.setProperty(key, value);
      return;
    }
    originalStyles[key] = el.style[key];
    el.style[key] = value;
  });
  if (ignoreCache) return;
  cache.set(el, originalStyles);
}
function reset(el, prop) {
  if (!el || !(el instanceof HTMLElement)) return;
  let originalStyles = cache.get(el);
  if (!originalStyles) {
    return;
  }
  {
    el.style[prop] = originalStyles[prop];
  }
}
const isVertical = (direction) => {
  switch (direction) {
    case "top":
    case "bottom":
      return true;
    case "left":
    case "right":
      return false;
    default:
      return direction;
  }
};
function getTranslate(element, direction) {
  if (!element) {
    return null;
  }
  const style = window.getComputedStyle(element);
  const transform = (
    // @ts-ignore
    style.transform || style.webkitTransform || style.mozTransform
  );
  let mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) {
    return parseFloat(mat[1].split(", ")[isVertical(direction) ? 13 : 12]);
  }
  mat = transform.match(/^matrix\((.+)\)$/);
  return mat ? parseFloat(mat[1].split(", ")[isVertical(direction) ? 5 : 4]) : null;
}
function dampenValue(v) {
  return 8 * (Math.log(v + 1) - 2);
}
function assignStyle(element, style) {
  if (!element) return () => {
  };
  const prevStyle = element.style.cssText;
  Object.assign(element.style, style);
  return () => {
    element.style.cssText = prevStyle;
  };
}
function chain(...fns) {
  return (...args) => {
    for (const fn of fns) {
      if (typeof fn === "function") {
        fn(...args);
      }
    }
  };
}
const TRANSITIONS = {
  DURATION: 0.5,
  EASE: [
    0.32,
    0.72,
    0,
    1
  ]
};
const VELOCITY_THRESHOLD = 0.4;
const CLOSE_THRESHOLD = 0.25;
const SCROLL_LOCK_TIMEOUT = 100;
const BORDER_RADIUS = 8;
const NESTED_DISPLACEMENT = 16;
const WINDOW_TOP_OFFSET = 26;
const DRAG_CLASS = "vaul-dragging";
function useCallbackRef(callback) {
  const callbackRef = React__default.useRef(callback);
  React__default.useEffect(() => {
    callbackRef.current = callback;
  });
  return React__default.useMemo(() => (...args) => callbackRef.current == null ? void 0 : callbackRef.current.call(callbackRef, ...args), []);
}
function useUncontrolledState({ defaultProp, onChange }) {
  const uncontrolledState = React__default.useState(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = React__default.useRef(value);
  const handleChange = useCallbackRef(onChange);
  React__default.useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value);
      prevValueRef.current = value;
    }
  }, [
    value,
    prevValueRef,
    handleChange
  ]);
  return uncontrolledState;
}
function useControllableState({ prop, defaultProp, onChange = () => {
} }) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  const handleChange = useCallbackRef(onChange);
  const setValue = React__default.useCallback((nextValue) => {
    if (isControlled) {
      const setter = nextValue;
      const value2 = typeof nextValue === "function" ? setter(prop) : nextValue;
      if (value2 !== prop) handleChange(value2);
    } else {
      setUncontrolledProp(nextValue);
    }
  }, [
    isControlled,
    prop,
    setUncontrolledProp,
    handleChange
  ]);
  return [
    value,
    setValue
  ];
}
function useSnapPoints({ activeSnapPointProp, setActiveSnapPointProp, snapPoints, drawerRef, overlayRef, fadeFromIndex, onSnapPointChange, direction = "bottom", container, snapToSequentialPoint }) {
  const [activeSnapPoint, setActiveSnapPoint] = useControllableState({
    prop: activeSnapPointProp,
    defaultProp: snapPoints == null ? void 0 : snapPoints[0],
    onChange: setActiveSnapPointProp
  });
  const [windowDimensions, setWindowDimensions] = React__default.useState(typeof window !== "undefined" ? {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
  } : void 0);
  React__default.useEffect(() => {
    function onResize() {
      setWindowDimensions({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
      });
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isLastSnapPoint = React__default.useMemo(() => activeSnapPoint === (snapPoints == null ? void 0 : snapPoints[snapPoints.length - 1]) || null, [
    snapPoints,
    activeSnapPoint
  ]);
  const activeSnapPointIndex = React__default.useMemo(() => {
    var _snapPoints_findIndex;
    return (_snapPoints_findIndex = snapPoints == null ? void 0 : snapPoints.findIndex((snapPoint) => snapPoint === activeSnapPoint)) != null ? _snapPoints_findIndex : null;
  }, [
    snapPoints,
    activeSnapPoint
  ]);
  const shouldFade = snapPoints && snapPoints.length > 0 && (fadeFromIndex || fadeFromIndex === 0) && !Number.isNaN(fadeFromIndex) && snapPoints[fadeFromIndex] === activeSnapPoint || !snapPoints;
  const snapPointsOffset = React__default.useMemo(() => {
    const containerSize = container ? {
      width: container.getBoundingClientRect().width,
      height: container.getBoundingClientRect().height
    } : typeof window !== "undefined" ? {
      width: window.innerWidth,
      height: window.innerHeight
    } : {
      width: 0,
      height: 0
    };
    var _snapPoints_map;
    return (_snapPoints_map = snapPoints == null ? void 0 : snapPoints.map((snapPoint) => {
      const isPx = typeof snapPoint === "string";
      let snapPointAsNumber = 0;
      if (isPx) {
        snapPointAsNumber = parseInt(snapPoint, 10);
      }
      if (isVertical(direction)) {
        const height = isPx ? snapPointAsNumber : windowDimensions ? snapPoint * containerSize.height : 0;
        if (windowDimensions) {
          return direction === "bottom" ? containerSize.height - height : -containerSize.height + height;
        }
        return height;
      }
      const width = isPx ? snapPointAsNumber : windowDimensions ? snapPoint * containerSize.width : 0;
      if (windowDimensions) {
        return direction === "right" ? containerSize.width - width : -containerSize.width + width;
      }
      return width;
    })) != null ? _snapPoints_map : [];
  }, [
    snapPoints,
    windowDimensions,
    container
  ]);
  const activeSnapPointOffset = React__default.useMemo(() => activeSnapPointIndex !== null ? snapPointsOffset == null ? void 0 : snapPointsOffset[activeSnapPointIndex] : null, [
    snapPointsOffset,
    activeSnapPointIndex
  ]);
  const snapToPoint = React__default.useCallback((dimension) => {
    var _snapPointsOffset_findIndex;
    const newSnapPointIndex = (_snapPointsOffset_findIndex = snapPointsOffset == null ? void 0 : snapPointsOffset.findIndex((snapPointDim) => snapPointDim === dimension)) != null ? _snapPointsOffset_findIndex : null;
    onSnapPointChange(newSnapPointIndex);
    set(drawerRef.current, {
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
      transform: isVertical(direction) ? `translate3d(0, ${dimension}px, 0)` : `translate3d(${dimension}px, 0, 0)`
    });
    if (snapPointsOffset && newSnapPointIndex !== snapPointsOffset.length - 1 && fadeFromIndex !== void 0 && newSnapPointIndex !== fadeFromIndex && newSnapPointIndex < fadeFromIndex) {
      set(overlayRef.current, {
        transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
        opacity: "0"
      });
    } else {
      set(overlayRef.current, {
        transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
        opacity: "1"
      });
    }
    setActiveSnapPoint(snapPoints == null ? void 0 : snapPoints[Math.max(newSnapPointIndex, 0)]);
  }, [
    drawerRef.current,
    snapPoints,
    snapPointsOffset,
    fadeFromIndex,
    overlayRef,
    setActiveSnapPoint
  ]);
  React__default.useEffect(() => {
    if (activeSnapPoint || activeSnapPointProp) {
      var _snapPoints_findIndex;
      const newIndex = (_snapPoints_findIndex = snapPoints == null ? void 0 : snapPoints.findIndex((snapPoint) => snapPoint === activeSnapPointProp || snapPoint === activeSnapPoint)) != null ? _snapPoints_findIndex : -1;
      if (snapPointsOffset && newIndex !== -1 && typeof snapPointsOffset[newIndex] === "number") {
        snapToPoint(snapPointsOffset[newIndex]);
      }
    }
  }, [
    activeSnapPoint,
    activeSnapPointProp,
    snapPoints,
    snapPointsOffset,
    snapToPoint
  ]);
  function onRelease({ draggedDistance, closeDrawer, velocity, dismissible }) {
    if (fadeFromIndex === void 0) return;
    const currentPosition = direction === "bottom" || direction === "right" ? (activeSnapPointOffset != null ? activeSnapPointOffset : 0) - draggedDistance : (activeSnapPointOffset != null ? activeSnapPointOffset : 0) + draggedDistance;
    const isOverlaySnapPoint = activeSnapPointIndex === fadeFromIndex - 1;
    const isFirst = activeSnapPointIndex === 0;
    const hasDraggedUp = draggedDistance > 0;
    if (isOverlaySnapPoint) {
      set(overlayRef.current, {
        transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`
      });
    }
    if (!snapToSequentialPoint && velocity > 2 && !hasDraggedUp) {
      if (dismissible) closeDrawer();
      else snapToPoint(snapPointsOffset[0]);
      return;
    }
    if (!snapToSequentialPoint && velocity > 2 && hasDraggedUp && snapPointsOffset && snapPoints) {
      snapToPoint(snapPointsOffset[snapPoints.length - 1]);
      return;
    }
    const closestSnapPoint = snapPointsOffset == null ? void 0 : snapPointsOffset.reduce((prev, curr) => {
      if (typeof prev !== "number" || typeof curr !== "number") return prev;
      return Math.abs(curr - currentPosition) < Math.abs(prev - currentPosition) ? curr : prev;
    });
    const dim = isVertical(direction) ? window.innerHeight : window.innerWidth;
    if (velocity > VELOCITY_THRESHOLD && Math.abs(draggedDistance) < dim * 0.4) {
      const dragDirection = hasDraggedUp ? 1 : -1;
      if (dragDirection > 0 && isLastSnapPoint && snapPoints) {
        snapToPoint(snapPointsOffset[snapPoints.length - 1]);
        return;
      }
      if (isFirst && dragDirection < 0 && dismissible) {
        closeDrawer();
      }
      if (activeSnapPointIndex === null) return;
      snapToPoint(snapPointsOffset[activeSnapPointIndex + dragDirection]);
      return;
    }
    snapToPoint(closestSnapPoint);
  }
  function onDrag({ draggedDistance }) {
    if (activeSnapPointOffset === null) return;
    const newValue = direction === "bottom" || direction === "right" ? activeSnapPointOffset - draggedDistance : activeSnapPointOffset + draggedDistance;
    if ((direction === "bottom" || direction === "right") && newValue < snapPointsOffset[snapPointsOffset.length - 1]) {
      return;
    }
    if ((direction === "top" || direction === "left") && newValue > snapPointsOffset[snapPointsOffset.length - 1]) {
      return;
    }
    set(drawerRef.current, {
      transform: isVertical(direction) ? `translate3d(0, ${newValue}px, 0)` : `translate3d(${newValue}px, 0, 0)`
    });
  }
  function getPercentageDragged(absDraggedDistance, isDraggingDown) {
    if (!snapPoints || typeof activeSnapPointIndex !== "number" || !snapPointsOffset || fadeFromIndex === void 0) return null;
    const isOverlaySnapPoint = activeSnapPointIndex === fadeFromIndex - 1;
    const isOverlaySnapPointOrHigher = activeSnapPointIndex >= fadeFromIndex;
    if (isOverlaySnapPointOrHigher && isDraggingDown) {
      return 0;
    }
    if (isOverlaySnapPoint && !isDraggingDown) return 1;
    if (!shouldFade && !isOverlaySnapPoint) return null;
    const targetSnapPointIndex = isOverlaySnapPoint ? activeSnapPointIndex + 1 : activeSnapPointIndex - 1;
    const snapPointDistance = isOverlaySnapPoint ? snapPointsOffset[targetSnapPointIndex] - snapPointsOffset[targetSnapPointIndex - 1] : snapPointsOffset[targetSnapPointIndex + 1] - snapPointsOffset[targetSnapPointIndex];
    const percentageDragged = absDraggedDistance / Math.abs(snapPointDistance);
    if (isOverlaySnapPoint) {
      return 1 - percentageDragged;
    } else {
      return percentageDragged;
    }
  }
  return {
    isLastSnapPoint,
    activeSnapPoint,
    shouldFade,
    getPercentageDragged,
    setActiveSnapPoint,
    activeSnapPointIndex,
    onRelease,
    onDrag,
    snapPointsOffset
  };
}
const noop = () => () => {
};
function useScaleBackground() {
  const { direction, isOpen, shouldScaleBackground, setBackgroundColorOnScale, noBodyStyles } = useDrawerContext();
  const timeoutIdRef = React__default.useRef(null);
  const initialBackgroundColor = reactExports.useMemo(() => document.body.style.backgroundColor, []);
  function getScale() {
    return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth;
  }
  React__default.useEffect(() => {
    if (isOpen && shouldScaleBackground) {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      const wrapper = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]");
      if (!wrapper) return;
      chain(setBackgroundColorOnScale && !noBodyStyles ? assignStyle(document.body, {
        background: "black"
      }) : noop, assignStyle(wrapper, {
        transformOrigin: isVertical(direction) ? "top" : "left",
        transitionProperty: "transform, border-radius",
        transitionDuration: `${TRANSITIONS.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(",")})`
      }));
      const wrapperStylesCleanup = assignStyle(wrapper, {
        borderRadius: `${BORDER_RADIUS}px`,
        overflow: "hidden",
        ...isVertical(direction) ? {
          transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`
        } : {
          transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`
        }
      });
      return () => {
        wrapperStylesCleanup();
        timeoutIdRef.current = window.setTimeout(() => {
          if (initialBackgroundColor) {
            document.body.style.background = initialBackgroundColor;
          } else {
            document.body.style.removeProperty("background");
          }
        }, TRANSITIONS.DURATION * 1e3);
      };
    }
  }, [
    isOpen,
    shouldScaleBackground,
    initialBackgroundColor
  ]);
}
let previousBodyPosition = null;
function usePositionFixed({ isOpen, modal, nested, hasBeenOpened, preventScrollRestoration, noBodyStyles }) {
  const [activeUrl, setActiveUrl] = React__default.useState(() => typeof window !== "undefined" ? window.location.href : "");
  const scrollPos = React__default.useRef(0);
  const setPositionFixed = React__default.useCallback(() => {
    if (!isSafari()) return;
    if (previousBodyPosition === null && isOpen && !noBodyStyles) {
      previousBodyPosition = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        height: document.body.style.height,
        right: "unset"
      };
      const { scrollX, innerHeight } = window;
      document.body.style.setProperty("position", "fixed", "important");
      Object.assign(document.body.style, {
        top: `${-scrollPos.current}px`,
        left: `${-scrollX}px`,
        right: "0px",
        height: "auto"
      });
      window.setTimeout(() => window.requestAnimationFrame(() => {
        const bottomBarHeight = innerHeight - window.innerHeight;
        if (bottomBarHeight && scrollPos.current >= innerHeight) {
          document.body.style.top = `${-(scrollPos.current + bottomBarHeight)}px`;
        }
      }), 300);
    }
  }, [
    isOpen
  ]);
  const restorePositionSetting = React__default.useCallback(() => {
    if (!isSafari()) return;
    if (previousBodyPosition !== null && !noBodyStyles) {
      const y = -parseInt(document.body.style.top, 10);
      const x = -parseInt(document.body.style.left, 10);
      Object.assign(document.body.style, previousBodyPosition);
      window.requestAnimationFrame(() => {
        if (preventScrollRestoration && activeUrl !== window.location.href) {
          setActiveUrl(window.location.href);
          return;
        }
        window.scrollTo(x, y);
      });
      previousBodyPosition = null;
    }
  }, [
    activeUrl
  ]);
  React__default.useEffect(() => {
    function onScroll() {
      scrollPos.current = window.scrollY;
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  React__default.useEffect(() => {
    if (!modal) return;
    return () => {
      if (typeof document === "undefined") return;
      const hasDrawerOpened = !!document.querySelector("[data-vaul-drawer]");
      if (hasDrawerOpened) return;
      restorePositionSetting();
    };
  }, [
    modal,
    restorePositionSetting
  ]);
  React__default.useEffect(() => {
    if (nested || !hasBeenOpened) return;
    if (isOpen) {
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
      !isStandalone && setPositionFixed();
      if (!modal) {
        window.setTimeout(() => {
          restorePositionSetting();
        }, 500);
      }
    } else {
      restorePositionSetting();
    }
  }, [
    isOpen,
    hasBeenOpened,
    activeUrl,
    modal,
    nested,
    setPositionFixed,
    restorePositionSetting
  ]);
  return {
    restorePositionSetting
  };
}
function Root({ open: openProp, onOpenChange, children, onDrag: onDragProp, onRelease: onReleaseProp, snapPoints, shouldScaleBackground = false, setBackgroundColorOnScale = true, closeThreshold = CLOSE_THRESHOLD, scrollLockTimeout = SCROLL_LOCK_TIMEOUT, dismissible = true, handleOnly = false, fadeFromIndex = snapPoints && snapPoints.length - 1, activeSnapPoint: activeSnapPointProp, setActiveSnapPoint: setActiveSnapPointProp, fixed, modal = true, onClose, nested, noBodyStyles = false, direction = "bottom", defaultOpen = false, disablePreventScroll = true, snapToSequentialPoint = false, preventScrollRestoration = false, repositionInputs = true, onAnimationEnd, container, autoFocus = false }) {
  var _drawerRef_current, _drawerRef_current1;
  const [isOpen = false, setIsOpen] = useControllableState({
    defaultProp: defaultOpen,
    prop: openProp,
    onChange: (o) => {
      onOpenChange == null ? void 0 : onOpenChange(o);
      if (!o && !nested) {
        restorePositionSetting();
      }
      setTimeout(() => {
        onAnimationEnd == null ? void 0 : onAnimationEnd(o);
      }, TRANSITIONS.DURATION * 1e3);
      if (o && !modal) {
        if (typeof window !== "undefined") {
          window.requestAnimationFrame(() => {
            document.body.style.pointerEvents = "auto";
          });
        }
      }
      if (!o) {
        document.body.style.pointerEvents = "auto";
      }
    }
  });
  const [hasBeenOpened, setHasBeenOpened] = React__default.useState(false);
  const [isDragging, setIsDragging] = React__default.useState(false);
  const [justReleased, setJustReleased] = React__default.useState(false);
  const overlayRef = React__default.useRef(null);
  const openTime = React__default.useRef(null);
  const dragStartTime = React__default.useRef(null);
  const dragEndTime = React__default.useRef(null);
  const lastTimeDragPrevented = React__default.useRef(null);
  const isAllowedToDrag = React__default.useRef(false);
  const nestedOpenChangeTimer = React__default.useRef(null);
  const pointerStart = React__default.useRef(0);
  const keyboardIsOpen = React__default.useRef(false);
  const shouldAnimate = React__default.useRef(!defaultOpen);
  const previousDiffFromInitial = React__default.useRef(0);
  const drawerRef = React__default.useRef(null);
  const drawerHeightRef = React__default.useRef(((_drawerRef_current = drawerRef.current) == null ? void 0 : _drawerRef_current.getBoundingClientRect().height) || 0);
  const drawerWidthRef = React__default.useRef(((_drawerRef_current1 = drawerRef.current) == null ? void 0 : _drawerRef_current1.getBoundingClientRect().width) || 0);
  const initialDrawerHeight = React__default.useRef(0);
  const onSnapPointChange = React__default.useCallback((activeSnapPointIndex2) => {
    if (snapPoints && activeSnapPointIndex2 === snapPointsOffset.length - 1) openTime.current = /* @__PURE__ */ new Date();
  }, []);
  const { activeSnapPoint, activeSnapPointIndex, setActiveSnapPoint, onRelease: onReleaseSnapPoints, snapPointsOffset, onDrag: onDragSnapPoints, shouldFade, getPercentageDragged: getSnapPointsPercentageDragged } = useSnapPoints({
    snapPoints,
    activeSnapPointProp,
    setActiveSnapPointProp,
    drawerRef,
    fadeFromIndex,
    overlayRef,
    onSnapPointChange,
    direction,
    container,
    snapToSequentialPoint
  });
  usePreventScroll({
    isDisabled: !isOpen || isDragging || !modal || justReleased || !hasBeenOpened || !repositionInputs || !disablePreventScroll
  });
  const { restorePositionSetting } = usePositionFixed({
    isOpen,
    modal,
    nested: nested != null ? nested : false,
    hasBeenOpened,
    preventScrollRestoration,
    noBodyStyles
  });
  function getScale() {
    return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth;
  }
  function onPress(event) {
    var _drawerRef_current2, _drawerRef_current12;
    if (!dismissible && !snapPoints) return;
    if (drawerRef.current && !drawerRef.current.contains(event.target)) return;
    drawerHeightRef.current = ((_drawerRef_current2 = drawerRef.current) == null ? void 0 : _drawerRef_current2.getBoundingClientRect().height) || 0;
    drawerWidthRef.current = ((_drawerRef_current12 = drawerRef.current) == null ? void 0 : _drawerRef_current12.getBoundingClientRect().width) || 0;
    setIsDragging(true);
    dragStartTime.current = /* @__PURE__ */ new Date();
    if (isIOS()) {
      window.addEventListener("touchend", () => isAllowedToDrag.current = false, {
        once: true
      });
    }
    event.target.setPointerCapture(event.pointerId);
    pointerStart.current = isVertical(direction) ? event.pageY : event.pageX;
  }
  function shouldDrag(el, isDraggingInDirection) {
    var _window_getSelection;
    let element = el;
    const highlightedText = (_window_getSelection = window.getSelection()) == null ? void 0 : _window_getSelection.toString();
    const swipeAmount = drawerRef.current ? getTranslate(drawerRef.current, direction) : null;
    const date = /* @__PURE__ */ new Date();
    if (element.tagName === "SELECT") {
      return false;
    }
    if (element.hasAttribute("data-vaul-no-drag") || element.closest("[data-vaul-no-drag]")) {
      return false;
    }
    if (direction === "right" || direction === "left") {
      return true;
    }
    if (openTime.current && date.getTime() - openTime.current.getTime() < 500) {
      return false;
    }
    if (swipeAmount !== null) {
      if (direction === "bottom" ? swipeAmount > 0 : swipeAmount < 0) {
        return true;
      }
    }
    if (highlightedText && highlightedText.length > 0) {
      return false;
    }
    if (lastTimeDragPrevented.current && date.getTime() - lastTimeDragPrevented.current.getTime() < scrollLockTimeout && swipeAmount === 0) {
      lastTimeDragPrevented.current = date;
      return false;
    }
    if (isDraggingInDirection) {
      lastTimeDragPrevented.current = date;
      return false;
    }
    while (element) {
      if (element.scrollHeight > element.clientHeight) {
        if (element.scrollTop !== 0) {
          lastTimeDragPrevented.current = /* @__PURE__ */ new Date();
          return false;
        }
        if (element.getAttribute("role") === "dialog") {
          return true;
        }
      }
      element = element.parentNode;
    }
    return true;
  }
  function onDrag(event) {
    if (!drawerRef.current) {
      return;
    }
    if (isDragging) {
      const directionMultiplier = direction === "bottom" || direction === "right" ? 1 : -1;
      const draggedDistance = (pointerStart.current - (isVertical(direction) ? event.pageY : event.pageX)) * directionMultiplier;
      const isDraggingInDirection = draggedDistance > 0;
      const noCloseSnapPointsPreCondition = snapPoints && !dismissible && !isDraggingInDirection;
      if (noCloseSnapPointsPreCondition && activeSnapPointIndex === 0) return;
      const absDraggedDistance = Math.abs(draggedDistance);
      const wrapper = document.querySelector("[data-vaul-drawer-wrapper]");
      const drawerDimension = direction === "bottom" || direction === "top" ? drawerHeightRef.current : drawerWidthRef.current;
      let percentageDragged = absDraggedDistance / drawerDimension;
      const snapPointPercentageDragged = getSnapPointsPercentageDragged(absDraggedDistance, isDraggingInDirection);
      if (snapPointPercentageDragged !== null) {
        percentageDragged = snapPointPercentageDragged;
      }
      if (noCloseSnapPointsPreCondition && percentageDragged >= 1) {
        return;
      }
      if (!isAllowedToDrag.current && !shouldDrag(event.target, isDraggingInDirection)) return;
      drawerRef.current.classList.add(DRAG_CLASS);
      isAllowedToDrag.current = true;
      set(drawerRef.current, {
        transition: "none"
      });
      set(overlayRef.current, {
        transition: "none"
      });
      if (snapPoints) {
        onDragSnapPoints({
          draggedDistance
        });
      }
      if (isDraggingInDirection && !snapPoints) {
        const dampenedDraggedDistance = dampenValue(draggedDistance);
        const translateValue = Math.min(dampenedDraggedDistance * -1, 0) * directionMultiplier;
        set(drawerRef.current, {
          transform: isVertical(direction) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
        });
        return;
      }
      const opacityValue = 1 - percentageDragged;
      if (shouldFade || fadeFromIndex && activeSnapPointIndex === fadeFromIndex - 1) {
        onDragProp == null ? void 0 : onDragProp(event, percentageDragged);
        set(overlayRef.current, {
          opacity: `${opacityValue}`,
          transition: "none"
        }, true);
      }
      if (wrapper && overlayRef.current && shouldScaleBackground) {
        const scaleValue = Math.min(getScale() + percentageDragged * (1 - getScale()), 1);
        const borderRadiusValue = 8 - percentageDragged * 8;
        const translateValue = Math.max(0, 14 - percentageDragged * 14);
        set(wrapper, {
          borderRadius: `${borderRadiusValue}px`,
          transform: isVertical(direction) ? `scale(${scaleValue}) translate3d(0, ${translateValue}px, 0)` : `scale(${scaleValue}) translate3d(${translateValue}px, 0, 0)`,
          transition: "none"
        }, true);
      }
      if (!snapPoints) {
        const translateValue = absDraggedDistance * directionMultiplier;
        set(drawerRef.current, {
          transform: isVertical(direction) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
        });
      }
    }
  }
  React__default.useEffect(() => {
    window.requestAnimationFrame(() => {
      shouldAnimate.current = true;
    });
  }, []);
  React__default.useEffect(() => {
    var _window_visualViewport;
    function onVisualViewportChange() {
      if (!drawerRef.current || !repositionInputs) return;
      const focusedElement = document.activeElement;
      if (isInput(focusedElement) || keyboardIsOpen.current) {
        var _window_visualViewport2;
        const visualViewportHeight = ((_window_visualViewport2 = window.visualViewport) == null ? void 0 : _window_visualViewport2.height) || 0;
        const totalHeight = window.innerHeight;
        let diffFromInitial = totalHeight - visualViewportHeight;
        const drawerHeight = drawerRef.current.getBoundingClientRect().height || 0;
        const isTallEnough = drawerHeight > totalHeight * 0.8;
        if (!initialDrawerHeight.current) {
          initialDrawerHeight.current = drawerHeight;
        }
        const offsetFromTop = drawerRef.current.getBoundingClientRect().top;
        if (Math.abs(previousDiffFromInitial.current - diffFromInitial) > 60) {
          keyboardIsOpen.current = !keyboardIsOpen.current;
        }
        if (snapPoints && snapPoints.length > 0 && snapPointsOffset && activeSnapPointIndex) {
          const activeSnapPointHeight = snapPointsOffset[activeSnapPointIndex] || 0;
          diffFromInitial += activeSnapPointHeight;
        }
        previousDiffFromInitial.current = diffFromInitial;
        if (drawerHeight > visualViewportHeight || keyboardIsOpen.current) {
          const height = drawerRef.current.getBoundingClientRect().height;
          let newDrawerHeight = height;
          if (height > visualViewportHeight) {
            newDrawerHeight = visualViewportHeight - (isTallEnough ? offsetFromTop : WINDOW_TOP_OFFSET);
          }
          if (fixed) {
            drawerRef.current.style.height = `${height - Math.max(diffFromInitial, 0)}px`;
          } else {
            drawerRef.current.style.height = `${Math.max(newDrawerHeight, visualViewportHeight - offsetFromTop)}px`;
          }
        } else if (!isMobileFirefox()) {
          drawerRef.current.style.height = `${initialDrawerHeight.current}px`;
        }
        if (snapPoints && snapPoints.length > 0 && !keyboardIsOpen.current) {
          drawerRef.current.style.bottom = `0px`;
        } else {
          drawerRef.current.style.bottom = `${Math.max(diffFromInitial, 0)}px`;
        }
      }
    }
    (_window_visualViewport = window.visualViewport) == null ? void 0 : _window_visualViewport.addEventListener("resize", onVisualViewportChange);
    return () => {
      var _window_visualViewport2;
      return (_window_visualViewport2 = window.visualViewport) == null ? void 0 : _window_visualViewport2.removeEventListener("resize", onVisualViewportChange);
    };
  }, [
    activeSnapPointIndex,
    snapPoints,
    snapPointsOffset
  ]);
  function closeDrawer(fromWithin) {
    cancelDrag();
    onClose == null ? void 0 : onClose();
    if (!fromWithin) {
      setIsOpen(false);
    }
    setTimeout(() => {
      if (snapPoints) {
        setActiveSnapPoint(snapPoints[0]);
      }
    }, TRANSITIONS.DURATION * 1e3);
  }
  function resetDrawer() {
    if (!drawerRef.current) return;
    const wrapper = document.querySelector("[data-vaul-drawer-wrapper]");
    const currentSwipeAmount = getTranslate(drawerRef.current, direction);
    set(drawerRef.current, {
      transform: "translate3d(0, 0, 0)",
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`
    });
    set(overlayRef.current, {
      transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
      opacity: "1"
    });
    if (shouldScaleBackground && currentSwipeAmount && currentSwipeAmount > 0 && isOpen) {
      set(wrapper, {
        borderRadius: `${BORDER_RADIUS}px`,
        overflow: "hidden",
        ...isVertical(direction) ? {
          transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
          transformOrigin: "top"
        } : {
          transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
          transformOrigin: "left"
        },
        transitionProperty: "transform, border-radius",
        transitionDuration: `${TRANSITIONS.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(",")})`
      }, true);
    }
  }
  function cancelDrag() {
    if (!isDragging || !drawerRef.current) return;
    drawerRef.current.classList.remove(DRAG_CLASS);
    isAllowedToDrag.current = false;
    setIsDragging(false);
    dragEndTime.current = /* @__PURE__ */ new Date();
  }
  function onRelease(event) {
    if (!isDragging || !drawerRef.current) return;
    drawerRef.current.classList.remove(DRAG_CLASS);
    isAllowedToDrag.current = false;
    setIsDragging(false);
    dragEndTime.current = /* @__PURE__ */ new Date();
    const swipeAmount = getTranslate(drawerRef.current, direction);
    if (!event || !shouldDrag(event.target, false) || !swipeAmount || Number.isNaN(swipeAmount)) return;
    if (dragStartTime.current === null) return;
    const timeTaken = dragEndTime.current.getTime() - dragStartTime.current.getTime();
    const distMoved = pointerStart.current - (isVertical(direction) ? event.pageY : event.pageX);
    const velocity = Math.abs(distMoved) / timeTaken;
    if (velocity > 0.05) {
      setJustReleased(true);
      setTimeout(() => {
        setJustReleased(false);
      }, 200);
    }
    if (snapPoints) {
      const directionMultiplier = direction === "bottom" || direction === "right" ? 1 : -1;
      onReleaseSnapPoints({
        draggedDistance: distMoved * directionMultiplier,
        closeDrawer,
        velocity,
        dismissible
      });
      onReleaseProp == null ? void 0 : onReleaseProp(event, true);
      return;
    }
    if (direction === "bottom" || direction === "right" ? distMoved > 0 : distMoved < 0) {
      resetDrawer();
      onReleaseProp == null ? void 0 : onReleaseProp(event, true);
      return;
    }
    if (velocity > VELOCITY_THRESHOLD) {
      closeDrawer();
      onReleaseProp == null ? void 0 : onReleaseProp(event, false);
      return;
    }
    var _drawerRef_current_getBoundingClientRect_height;
    const visibleDrawerHeight = Math.min((_drawerRef_current_getBoundingClientRect_height = drawerRef.current.getBoundingClientRect().height) != null ? _drawerRef_current_getBoundingClientRect_height : 0, window.innerHeight);
    var _drawerRef_current_getBoundingClientRect_width;
    const visibleDrawerWidth = Math.min((_drawerRef_current_getBoundingClientRect_width = drawerRef.current.getBoundingClientRect().width) != null ? _drawerRef_current_getBoundingClientRect_width : 0, window.innerWidth);
    const isHorizontalSwipe = direction === "left" || direction === "right";
    if (Math.abs(swipeAmount) >= (isHorizontalSwipe ? visibleDrawerWidth : visibleDrawerHeight) * closeThreshold) {
      closeDrawer();
      onReleaseProp == null ? void 0 : onReleaseProp(event, false);
      return;
    }
    onReleaseProp == null ? void 0 : onReleaseProp(event, true);
    resetDrawer();
  }
  React__default.useEffect(() => {
    if (isOpen) {
      set(document.documentElement, {
        scrollBehavior: "auto"
      });
      openTime.current = /* @__PURE__ */ new Date();
    }
    return () => {
      reset(document.documentElement, "scrollBehavior");
    };
  }, [
    isOpen
  ]);
  function onNestedOpenChange(o) {
    const scale = o ? (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth : 1;
    const initialTranslate = o ? -NESTED_DISPLACEMENT : 0;
    if (nestedOpenChangeTimer.current) {
      window.clearTimeout(nestedOpenChangeTimer.current);
    }
    set(drawerRef.current, {
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
      transform: isVertical(direction) ? `scale(${scale}) translate3d(0, ${initialTranslate}px, 0)` : `scale(${scale}) translate3d(${initialTranslate}px, 0, 0)`
    });
    if (!o && drawerRef.current) {
      nestedOpenChangeTimer.current = setTimeout(() => {
        const translateValue = getTranslate(drawerRef.current, direction);
        set(drawerRef.current, {
          transition: "none",
          transform: isVertical(direction) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
        });
      }, 500);
    }
  }
  function onNestedDrag(_event, percentageDragged) {
    if (percentageDragged < 0) return;
    const initialScale = (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth;
    const newScale = initialScale + percentageDragged * (1 - initialScale);
    const newTranslate = -NESTED_DISPLACEMENT + percentageDragged * NESTED_DISPLACEMENT;
    set(drawerRef.current, {
      transform: isVertical(direction) ? `scale(${newScale}) translate3d(0, ${newTranslate}px, 0)` : `scale(${newScale}) translate3d(${newTranslate}px, 0, 0)`,
      transition: "none"
    });
  }
  function onNestedRelease(_event, o) {
    const dim = isVertical(direction) ? window.innerHeight : window.innerWidth;
    const scale = o ? (dim - NESTED_DISPLACEMENT) / dim : 1;
    const translate = o ? -NESTED_DISPLACEMENT : 0;
    if (o) {
      set(drawerRef.current, {
        transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
        transform: isVertical(direction) ? `scale(${scale}) translate3d(0, ${translate}px, 0)` : `scale(${scale}) translate3d(${translate}px, 0, 0)`
      });
    }
  }
  React__default.useEffect(() => {
    if (!modal) {
      window.requestAnimationFrame(() => {
        document.body.style.pointerEvents = "auto";
      });
    }
  }, [
    modal
  ]);
  return /* @__PURE__ */ React__default.createElement(Root$1, {
    defaultOpen,
    onOpenChange: (open) => {
      if (!dismissible && !open) return;
      if (open) {
        setHasBeenOpened(true);
      } else {
        closeDrawer(true);
      }
      setIsOpen(open);
    },
    open: isOpen
  }, /* @__PURE__ */ React__default.createElement(DrawerContext.Provider, {
    value: {
      activeSnapPoint,
      snapPoints,
      setActiveSnapPoint,
      drawerRef,
      overlayRef,
      onOpenChange,
      onPress,
      onRelease,
      onDrag,
      dismissible,
      shouldAnimate,
      handleOnly,
      isOpen,
      isDragging,
      shouldFade,
      closeDrawer,
      onNestedDrag,
      onNestedOpenChange,
      onNestedRelease,
      keyboardIsOpen,
      modal,
      snapPointsOffset,
      activeSnapPointIndex,
      direction,
      shouldScaleBackground,
      setBackgroundColorOnScale,
      noBodyStyles,
      container,
      autoFocus
    }
  }, children));
}
const Overlay = /* @__PURE__ */ React__default.forwardRef(function({ ...rest }, ref) {
  const { overlayRef, snapPoints, onRelease, shouldFade, isOpen, modal, shouldAnimate } = useDrawerContext();
  const composedRef = useComposedRefs(ref, overlayRef);
  const hasSnapPoints = snapPoints && snapPoints.length > 0;
  if (!modal) {
    return null;
  }
  const onMouseUp = React__default.useCallback((event) => onRelease(event), [
    onRelease
  ]);
  return /* @__PURE__ */ React__default.createElement(Overlay$1, {
    onMouseUp,
    ref: composedRef,
    "data-vaul-overlay": "",
    "data-vaul-snap-points": isOpen && hasSnapPoints ? "true" : "false",
    "data-vaul-snap-points-overlay": isOpen && shouldFade ? "true" : "false",
    "data-vaul-animate": (shouldAnimate == null ? void 0 : shouldAnimate.current) ? "true" : "false",
    ...rest
  });
});
Overlay.displayName = "Drawer.Overlay";
const Content = /* @__PURE__ */ React__default.forwardRef(function({ onPointerDownOutside, style, onOpenAutoFocus, ...rest }, ref) {
  const { drawerRef, onPress, onRelease, onDrag, keyboardIsOpen, snapPointsOffset, activeSnapPointIndex, modal, isOpen, direction, snapPoints, container, handleOnly, shouldAnimate, autoFocus } = useDrawerContext();
  const [delayedSnapPoints, setDelayedSnapPoints] = React__default.useState(false);
  const composedRef = useComposedRefs(ref, drawerRef);
  const pointerStartRef = React__default.useRef(null);
  const lastKnownPointerEventRef = React__default.useRef(null);
  const wasBeyondThePointRef = React__default.useRef(false);
  const hasSnapPoints = snapPoints && snapPoints.length > 0;
  useScaleBackground();
  const isDeltaInDirection = (delta, direction2, threshold = 0) => {
    if (wasBeyondThePointRef.current) return true;
    const deltaY = Math.abs(delta.y);
    const deltaX = Math.abs(delta.x);
    const isDeltaX = deltaX > deltaY;
    const dFactor = [
      "bottom",
      "right"
    ].includes(direction2) ? 1 : -1;
    if (direction2 === "left" || direction2 === "right") {
      const isReverseDirection = delta.x * dFactor < 0;
      if (!isReverseDirection && deltaX >= 0 && deltaX <= threshold) {
        return isDeltaX;
      }
    } else {
      const isReverseDirection = delta.y * dFactor < 0;
      if (!isReverseDirection && deltaY >= 0 && deltaY <= threshold) {
        return !isDeltaX;
      }
    }
    wasBeyondThePointRef.current = true;
    return true;
  };
  React__default.useEffect(() => {
    if (hasSnapPoints) {
      window.requestAnimationFrame(() => {
        setDelayedSnapPoints(true);
      });
    }
  }, []);
  function handleOnPointerUp(event) {
    pointerStartRef.current = null;
    wasBeyondThePointRef.current = false;
    onRelease(event);
  }
  return /* @__PURE__ */ React__default.createElement(Content$1, {
    "data-vaul-drawer-direction": direction,
    "data-vaul-drawer": "",
    "data-vaul-delayed-snap-points": delayedSnapPoints ? "true" : "false",
    "data-vaul-snap-points": isOpen && hasSnapPoints ? "true" : "false",
    "data-vaul-custom-container": container ? "true" : "false",
    "data-vaul-animate": (shouldAnimate == null ? void 0 : shouldAnimate.current) ? "true" : "false",
    ...rest,
    ref: composedRef,
    style: snapPointsOffset && snapPointsOffset.length > 0 ? {
      "--snap-point-height": `${snapPointsOffset[activeSnapPointIndex != null ? activeSnapPointIndex : 0]}px`,
      ...style
    } : style,
    onPointerDown: (event) => {
      if (handleOnly) return;
      rest.onPointerDown == null ? void 0 : rest.onPointerDown.call(rest, event);
      pointerStartRef.current = {
        x: event.pageX,
        y: event.pageY
      };
      onPress(event);
    },
    onOpenAutoFocus: (e) => {
      onOpenAutoFocus == null ? void 0 : onOpenAutoFocus(e);
      if (!autoFocus) {
        e.preventDefault();
      }
    },
    onPointerDownOutside: (e) => {
      onPointerDownOutside == null ? void 0 : onPointerDownOutside(e);
      if (!modal || e.defaultPrevented) {
        e.preventDefault();
        return;
      }
      if (keyboardIsOpen.current) {
        keyboardIsOpen.current = false;
      }
    },
    onFocusOutside: (e) => {
      if (!modal) {
        e.preventDefault();
        return;
      }
    },
    onPointerMove: (event) => {
      lastKnownPointerEventRef.current = event;
      if (handleOnly) return;
      rest.onPointerMove == null ? void 0 : rest.onPointerMove.call(rest, event);
      if (!pointerStartRef.current) return;
      const yPosition = event.pageY - pointerStartRef.current.y;
      const xPosition = event.pageX - pointerStartRef.current.x;
      const swipeStartThreshold = event.pointerType === "touch" ? 10 : 2;
      const delta = {
        x: xPosition,
        y: yPosition
      };
      const isAllowedToSwipe = isDeltaInDirection(delta, direction, swipeStartThreshold);
      if (isAllowedToSwipe) onDrag(event);
      else if (Math.abs(xPosition) > swipeStartThreshold || Math.abs(yPosition) > swipeStartThreshold) {
        pointerStartRef.current = null;
      }
    },
    onPointerUp: (event) => {
      rest.onPointerUp == null ? void 0 : rest.onPointerUp.call(rest, event);
      pointerStartRef.current = null;
      wasBeyondThePointRef.current = false;
      onRelease(event);
    },
    onPointerOut: (event) => {
      rest.onPointerOut == null ? void 0 : rest.onPointerOut.call(rest, event);
      handleOnPointerUp(lastKnownPointerEventRef.current);
    },
    onContextMenu: (event) => {
      rest.onContextMenu == null ? void 0 : rest.onContextMenu.call(rest, event);
      if (lastKnownPointerEventRef.current) {
        handleOnPointerUp(lastKnownPointerEventRef.current);
      }
    }
  });
});
Content.displayName = "Drawer.Content";
const LONG_HANDLE_PRESS_TIMEOUT = 250;
const DOUBLE_TAP_TIMEOUT = 120;
const Handle = /* @__PURE__ */ React__default.forwardRef(function({ preventCycle = false, children, ...rest }, ref) {
  const { closeDrawer, isDragging, snapPoints, activeSnapPoint, setActiveSnapPoint, dismissible, handleOnly, isOpen, onPress, onDrag } = useDrawerContext();
  const closeTimeoutIdRef = React__default.useRef(null);
  const shouldCancelInteractionRef = React__default.useRef(false);
  function handleStartCycle() {
    if (shouldCancelInteractionRef.current) {
      handleCancelInteraction();
      return;
    }
    window.setTimeout(() => {
      handleCycleSnapPoints();
    }, DOUBLE_TAP_TIMEOUT);
  }
  function handleCycleSnapPoints() {
    if (isDragging || preventCycle || shouldCancelInteractionRef.current) {
      handleCancelInteraction();
      return;
    }
    handleCancelInteraction();
    if (!snapPoints || snapPoints.length === 0) {
      if (!dismissible) {
        closeDrawer();
      }
      return;
    }
    const isLastSnapPoint = activeSnapPoint === snapPoints[snapPoints.length - 1];
    if (isLastSnapPoint && dismissible) {
      closeDrawer();
      return;
    }
    const currentSnapIndex = snapPoints.findIndex((point) => point === activeSnapPoint);
    if (currentSnapIndex === -1) return;
    const nextSnapPoint = snapPoints[currentSnapIndex + 1];
    setActiveSnapPoint(nextSnapPoint);
  }
  function handleStartInteraction() {
    closeTimeoutIdRef.current = window.setTimeout(() => {
      shouldCancelInteractionRef.current = true;
    }, LONG_HANDLE_PRESS_TIMEOUT);
  }
  function handleCancelInteraction() {
    if (closeTimeoutIdRef.current) {
      window.clearTimeout(closeTimeoutIdRef.current);
    }
    shouldCancelInteractionRef.current = false;
  }
  return /* @__PURE__ */ React__default.createElement("div", {
    onClick: handleStartCycle,
    onPointerCancel: handleCancelInteraction,
    onPointerDown: (e) => {
      if (handleOnly) onPress(e);
      handleStartInteraction();
    },
    onPointerMove: (e) => {
      if (handleOnly) onDrag(e);
    },
    // onPointerUp is already handled by the content component
    ref,
    "data-vaul-drawer-visible": isOpen ? "true" : "false",
    "data-vaul-handle": "",
    "aria-hidden": "true",
    ...rest
  }, /* @__PURE__ */ React__default.createElement("span", {
    "data-vaul-handle-hitarea": "",
    "aria-hidden": "true"
  }, children));
});
Handle.displayName = "Drawer.Handle";
function Portal(props) {
  const context = useDrawerContext();
  const { container = context.container, ...portalProps } = props;
  return /* @__PURE__ */ React__default.createElement(Portal$1, {
    container,
    ...portalProps
  });
}
const Drawer$1 = {
  Root,
  Content,
  Overlay,
  Trigger,
  Portal,
  Close,
  Title
};
function Drawer({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer$1.Root, { "data-slot": "drawer", ...props });
}
function DrawerTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer$1.Trigger, { "data-slot": "drawer-trigger", ...props });
}
function DrawerPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer$1.Portal, { "data-slot": "drawer-portal", ...props });
}
function DrawerClose({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer$1.Close, { "data-slot": "drawer-close", ...props });
}
function DrawerOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Drawer$1.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DrawerContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerPortal, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Drawer$1.Content,
      {
        "data-slot": "drawer-content",
        className: cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" }),
          children
        ]
      }
    )
  ] });
}
function DrawerHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "drawer-header",
      className: cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      ),
      ...props
    }
  );
}
function DrawerFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "drawer-footer",
      className: cn("mt-auto flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
function DrawerTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Drawer$1.Title,
    {
      "data-slot": "drawer-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
const PAGE_SIZE = 12;
const PROPERTY_TYPES = [
  { value: "all", label: "All Types" },
  { value: "rental", label: "Rental" },
  { value: "sale", label: "For Sale" },
  { value: "resale", label: "Resale" },
  { value: "newProject", label: "New Project" },
  { value: "plotLand", label: "Plots & Land" }
];
const BEDROOM_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" }
];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" }
];
function buildFilters(params) {
  return {
    propertyType: params.type && params.type !== "all" ? params.type : void 0,
    minPrice: params.priceMin ? Number(params.priceMin) : void 0,
    maxPrice: params.priceMax ? Number(params.priceMax) : void 0,
    minBedrooms: params.beds && params.beds !== "any" ? Number(params.beds) : void 0,
    city: params.city || void 0,
    search: void 0,
    page: params.page ? Number(params.page) : 1,
    limit: PAGE_SIZE
  };
}
function buildSeoTitle(params) {
  var _a, _b;
  const typeLabel = ((_a = PROPERTY_TYPES.find((t) => t.value === params.type)) == null ? void 0 : _a.label) ?? "";
  const city = (_b = params.city) == null ? void 0 : _b.trim();
  if (typeLabel && typeLabel !== "All Types" && city) {
    return `${typeLabel} Properties in ${city} | PropListify`;
  }
  if (typeLabel && typeLabel !== "All Types") {
    return `${typeLabel} Properties | PropListify`;
  }
  if (city) {
    return `Properties in ${city} | PropListify`;
  }
  return "PropListify Properties | Browse All Listings";
}
function buildSeoDescription(params) {
  var _a, _b;
  const typeLabel = ((_a = PROPERTY_TYPES.find((t) => t.value === params.type)) == null ? void 0 : _a.label) ?? "";
  const city = (_b = params.city) == null ? void 0 : _b.trim();
  if (typeLabel && city)
    return `Browse ${typeLabel.toLowerCase()} listings in ${city}. Discover your perfect home on PropListify.`;
  if (typeLabel)
    return `Explore ${typeLabel.toLowerCase()} listings across top locations. Find the perfect property with PropListify.`;
  return "Browse rentals, homes for sale, resales, new projects, and plots. Your next home starts here on PropListify.";
}
function getPageRange(current, total) {
  const maxShown = 5;
  if (total <= maxShown) return Array.from({ length: total }, (_, i) => i + 1);
  const half = Math.floor(maxShown / 2);
  let start = Math.max(1, current - half);
  const end = Math.min(total, start + maxShown - 1);
  start = Math.max(1, end - maxShown + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
function hasActiveFilters(params) {
  return !!(params.type && params.type !== "all" || params.priceMin || params.priceMax || params.beds && params.beds !== "any" || params.city);
}
function FilterPanel({
  draft,
  onDraftChange,
  onApply,
  onClear
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 flex-1 overflow-y-auto px-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Property Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: PROPERTY_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            id: `filter-type-${t.value}`,
            "data-ocid": `filter-type-${t.value}`,
            checked: t.value === "all" ? !draft.type || draft.type === "all" : draft.type === t.value,
            onCheckedChange: () => onDraftChange({
              ...draft,
              type: t.value === "all" ? "all" : t.value
            })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: `filter-type-${t.value}`,
            className: "text-sm text-foreground hover:text-accent transition-colors cursor-pointer",
            children: t.label
          }
        )
      ] }, t.value)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Price Range" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "Min Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "filter-price-min",
              type: "number",
              placeholder: "0",
              value: draft.priceMin ?? "",
              onChange: (e) => onDraftChange({
                ...draft,
                priceMin: e.target.value || void 0
              }),
              className: "h-9 text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "Max Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "filter-price-max",
              type: "number",
              placeholder: "Any",
              value: draft.priceMax ?? "",
              onChange: (e) => onDraftChange({
                ...draft,
                priceMax: e.target.value || void 0
              }),
              className: "h-9 text-sm"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          id: "bedrooms-label",
          className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3",
          children: "Bedrooms"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: BEDROOM_OPTIONS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `filter-beds-${b.value}`,
          onClick: () => onDraftChange({ ...draft, beds: b.value }),
          className: `text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-150 ${(draft.beds ?? "any") === b.value ? "bg-accent text-accent-foreground border-accent" : "bg-card text-foreground border-border hover:border-accent/60"}`,
          children: b.label
        },
        b.value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "City / Location" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "filter-city",
          type: "text",
          placeholder: "e.g. Mumbai, New York…",
          value: draft.city ?? "",
          onChange: (e) => onDraftChange({ ...draft, city: e.target.value || void 0 }),
          className: "h-9 text-sm"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "filter-apply",
          onClick: onApply,
          className: "flex-1 bg-accent text-accent-foreground hover:opacity-90",
          size: "sm",
          children: "Apply Filters"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "filter-clear",
          onClick: onClear,
          variant: "outline",
          size: "sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
            "Clear"
          ]
        }
      )
    ] })
  ] });
}
function CardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden border border-border bg-card shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-14" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-14" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-16" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full mt-2 rounded-lg" })
    ] })
  ] });
}
function PropertiesPage() {
  var _a;
  const rawSearch = useSearch({ strict: false });
  const navigate = useNavigate();
  const [draft, setDraft] = reactExports.useState({
    type: rawSearch.type ?? "all",
    priceMin: rawSearch.priceMin,
    priceMax: rawSearch.priceMax,
    beds: rawSearch.beds ?? "any",
    city: rawSearch.city
  });
  const currentSort = rawSearch.sort ?? "newest";
  const currentPage = rawSearch.page ? Number(rawSearch.page) : 1;
  const filters = reactExports.useMemo(() => buildFilters(rawSearch), [rawSearch]);
  const { data, isLoading, isFetching } = useProperties(filters);
  reactExports.useEffect(() => {
    setDraft({
      type: rawSearch.type ?? "all",
      priceMin: rawSearch.priceMin,
      priceMax: rawSearch.priceMax,
      beds: rawSearch.beds ?? "any",
      city: rawSearch.city
    });
  }, [
    rawSearch.type,
    rawSearch.priceMin,
    rawSearch.priceMax,
    rawSearch.beds,
    rawSearch.city
  ]);
  reactExports.useEffect(() => {
    var _a2;
    const title = buildSeoTitle(rawSearch);
    const desc = buildSeoDescription(rawSearch);
    setPageMeta(title, desc, void 0, window.location.href);
    const breadcrumbItems2 = [
      { label: "Home", href: "/" },
      { label: "Properties", href: "/properties" }
    ];
    const typeLabel2 = (_a2 = PROPERTY_TYPES.find(
      (t) => t.value === rawSearch.type
    )) == null ? void 0 : _a2.label;
    if (typeLabel2 && typeLabel2 !== "All Types") {
      breadcrumbItems2.push({ label: typeLabel2 });
    }
    generateBreadcrumbJsonLD(breadcrumbItems2);
  }, [rawSearch]);
  function pushParams(updates) {
    void navigate({
      // @ts-expect-error strict routing not used here
      search: (prev) => ({
        ...prev,
        ...updates
      })
    });
  }
  function applyDraft() {
    pushParams({ ...draft, page: "1" });
  }
  function clearFilters() {
    setDraft({ type: "all", beds: "any" });
    pushParams({
      type: void 0,
      priceMin: void 0,
      priceMax: void 0,
      beds: void 0,
      city: void 0,
      page: "1"
    });
  }
  function setSort(value) {
    pushParams({ ...rawSearch, sort: value, page: "1" });
  }
  function setPage(p) {
    pushParams({ ...rawSearch, page: String(p) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const typeLabel = (_a = PROPERTY_TYPES.find(
    (t) => t.value === rawSearch.type
  )) == null ? void 0 : _a.label;
  const activeFilterCount = [
    rawSearch.type && rawSearch.type !== "all",
    rawSearch.priceMin,
    rawSearch.priceMax,
    rawSearch.beds && rawSearch.beds !== "any",
    rawSearch.city
  ].filter(Boolean).length;
  const breadcrumbItems = [
    { label: "Properties", href: "/properties" }
  ];
  if (typeLabel && typeLabel !== "All Types") {
    breadcrumbItems.push({ label: typeLabel });
  }
  const totalPages = (data == null ? void 0 : data.totalPages) ?? 0;
  const pageRange = getPageRange(currentPage, totalPages);
  const isFiltered = hasActiveFilters(rawSearch);
  const loading = isLoading || isFetching;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { items: breadcrumbItems }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl text-foreground leading-tight", children: typeLabel && typeLabel !== "All Types" ? `${typeLabel} Properties` : "Browse All Properties" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
            loading ? "Loading listings…" : data ? `${data.total.toLocaleString()} propert${data.total === 1 ? "y" : "ies"} found` : "",
            rawSearch.city ? ` in ${rawSearch.city}` : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-muted-foreground hidden sm:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: currentSort, onValueChange: setSort, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "sort-select",
                className: "w-48 text-sm h-9 border-input",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SORT_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
          ] })
        ] })
      ] }),
      isFiltered && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-3", children: [
        rawSearch.type && rawSearch.type !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterChip,
          {
            label: typeLabel ?? rawSearch.type,
            onRemove: () => pushParams({ ...rawSearch, type: void 0, page: "1" })
          }
        ),
        (rawSearch.priceMin || rawSearch.priceMax) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterChip,
          {
            label: `$${rawSearch.priceMin ?? 0}–${rawSearch.priceMax ? `$${rawSearch.priceMax}` : "Any"}`,
            onRemove: () => pushParams({
              ...rawSearch,
              priceMin: void 0,
              priceMax: void 0,
              page: "1"
            })
          }
        ),
        rawSearch.beds && rawSearch.beds !== "any" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterChip,
          {
            label: `${rawSearch.beds}+ Beds`,
            onRemove: () => pushParams({ ...rawSearch, beds: void 0, page: "1" })
          }
        ),
        rawSearch.city && /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterChip,
          {
            label: rawSearch.city,
            onRemove: () => pushParams({ ...rawSearch, city: void 0, page: "1" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: clearFilters,
            className: "text-xs text-muted-foreground hover:text-destructive transition-colors underline underline-offset-2 ml-1",
            children: "Clear all"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block w-64 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 bg-card rounded-xl border border-border p-5 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "Filters" }),
          activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-semibold", children: [
            activeFilterCount,
            " active"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterPanel,
          {
            draft,
            onDraftChange: setDraft,
            onApply: applyDraft,
            onClear: clearFilters
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-5 lg:hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Drawer, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "mobile-filter-btn",
                variant: "outline",
                size: "sm",
                className: "gap-2 relative",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4" }),
                  "Filters",
                  activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center", children: activeFilterCount })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerHeader, { className: "border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { className: "font-display font-bold", children: "Filter Properties" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-0 flex-1 overflow-hidden px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterPanel,
                {
                  draft,
                  onDraftChange: setDraft,
                  onApply: applyDraft,
                  onClear: clearFilters
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerFooter, { className: "border-t border-border pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerClose, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", children: "Close" }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: currentSort, onValueChange: setSort, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "sort-select-mobile",
                className: "w-44 text-sm h-9 border-input",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SORT_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 transition-opacity duration-200 ${isFetching && !isLoading ? "opacity-60" : "opacity-100"}`,
            children: isLoading ? ["s0", "s1", "s2", "s3", "s4", "s5"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, key)) : ((data == null ? void 0 : data.properties) ?? []).map((property, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 18 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.3, delay: i * 0.04 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyCard, { property })
              },
              property.id
            ))
          }
        ),
        !isLoading && ((data == null ? void 0 : data.properties.length) ?? 0) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "empty-state",
            className: "flex flex-col items-center justify-center py-20 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchX, { className: "w-8 h-8 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-xl mb-2", children: "No properties found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mb-7", children: "We couldn't find any listings matching your current filters. Try widening your search or clearing some filters." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "empty-clear-filters",
                  onClick: clearFilters,
                  variant: "outline",
                  className: "gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                    "Clear All Filters"
                  ]
                }
              )
            ]
          }
        ),
        !isLoading && totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "pagination",
            className: "flex items-center justify-center gap-1.5 mt-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  "data-ocid": "pagination-prev",
                  onClick: () => setPage(currentPage - 1),
                  disabled: currentPage <= 1,
                  className: "h-9 px-3 text-xs",
                  children: "Previous"
                }
              ),
              pageRange[0] > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PageBtn, { page: 1, current: currentPage, onClick: setPage }),
                pageRange[0] > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm px-1", children: "…" })
              ] }),
              pageRange.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                PageBtn,
                {
                  page: p,
                  current: currentPage,
                  onClick: setPage
                },
                p
              )),
              pageRange[pageRange.length - 1] < totalPages && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                pageRange[pageRange.length - 1] < totalPages - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm px-1", children: "…" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PageBtn,
                  {
                    page: totalPages,
                    current: currentPage,
                    onClick: setPage
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  "data-ocid": "pagination-next",
                  onClick: () => setPage(currentPage + 1),
                  disabled: currentPage >= totalPages,
                  className: "h-9 px-3 text-xs",
                  children: "Next"
                }
              )
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
function FilterChip({
  label,
  onRemove
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium bg-accent/10 text-accent border border-accent/20 px-2.5 py-1 rounded-full", children: [
    label,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onRemove,
        "aria-label": `Remove ${label} filter`,
        className: "hover:text-destructive transition-colors ml-0.5",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
      }
    )
  ] });
}
function PageBtn({
  page,
  current,
  onClick
}) {
  const active = page === current;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "data-ocid": `pagination-page-${page}`,
      onClick: () => onClick(page),
      "aria-label": `Go to page ${page}`,
      "aria-current": active ? "page" : void 0,
      className: `w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-150 ${active ? "bg-accent text-accent-foreground shadow-sm" : "bg-card border border-border text-foreground hover:border-accent/60 hover:text-accent"}`,
      children: page
    }
  );
}
export {
  PropertiesPage
};
