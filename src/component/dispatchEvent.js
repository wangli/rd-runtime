export default function ($el, event, component, value) {
   if ($el && $el.getAttribute && $el.getAttribute(event)) {
      $el.dispatchEvent(new CustomEvent(event, {
         detail: {
            component,
            value
         }
      }));
   }
}