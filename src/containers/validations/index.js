(function() {
  const moduleName = 'radio-button-strip';

  const factory = cnp => {
    const defaultClassNamePrefix = 'fancy-radio-';
    const classNamePrefix = cnp !== undefined ? cnp : defaultClassNamePrefix;

    const module = {};

    const ASSERT = (condition, msg) => {
      if (!condition) {
        throw new Error('Assertion failed: ' + msg);
      }
    };

    const requirePopulatedArray = function(arr, msg) {
      ASSERT(arr && arr.length && arr.length > 0, msg);
    };

    const optionExample = {
      contents: 'Selection option',
      value: 'value',
    };

    const selectOptionsExample = {
      id: '420',
      classes: ['some-class', 'some-other-class'],
      options: [
        optionExample,
        {
          contents: 'Other option',
          value: 'other',
        },
      ],
      onClick: function() {},
    };

    /**
     * Copies the given DOM element.
     *
     * @param {Element} element element to copy, not null
     * @returns copied element, not null
     */
    const copyElement = element => {
      ASSERT(element instanceof Element);

      return element.cloneNode(true);
    };

    /**
     * Decorate the given DOM element (must be a wrapper element containing a
     * fieldset containing n input/label pairs.)
     *
     * @param {Element} domElement element to decorate
     * @param {boolean} copy TRUE if the element should be copied, FALSE if
     * the modifications should be performed on the given element.
     *
     * @returns reference to the decorated element; refers to the given
     * element if 'copy' is false, or the copied element otherwise
     */
    const decorateElement = (domElement, copy) => {
      ASSERT(domElement instanceof Element, 'Given element must be Element');

      /** @type {Element} */
      let elem = copy ? copyElement(domElement) : domElement;

      ASSERT(elem.children.length > 0, 'Wrapper element must have at least one child');

      for (let i = 0; i < elem.children.length; i++) {
        let inner = elem.children[i];

        ASSERT(inner.children.length % 2 === 0, 'Inner element must have even number of input/label pairs');

        let paired = true;
        for (let j = 0; j < inner.children; j++) {
          let child = inner.children[j];

          ASSERT(paired && child.tagName.toLowerCase() === 'input', 'All labels must have matching input');

          ASSERT(!paired && child.tagName.toLowerCase() === 'label', 'All inputs must have matching label');

          paired = !paired;
        }

        inner.classList.add(classNamePrefix + 'inner');
      }

      elem.classList.add(classNamePrefix + 'wrapper');

      return elem;
    };

    const generateID = () =>
      Math.random()
        .toString(16)
        .slice(2) + new Date().getTime();

    /* API for decorating existing DOM elements */
    module.decorateElements = function(elements) {
      requirePopulatedArray(elements, 'Was given < 1 elements to decorate');

      elements.forEach(decorateElement);
    };

    /* API for creating DOM elements */
    module.createElements = function(options, element, name, elementName, doc) {
      requirePopulatedArray(options, 'Was given < 1 select options');

      ASSERT(name != undefined, 'name is required');

      const d = doc ? doc : document;

      let inner = d.createElement('fieldset');
      inner.classList.add(classNamePrefix + 'inner');

      ASSERT(options.length > 0, 'Must have at least one option');

      options.forEach(option => {
        let input = inner.appendChild(d.createElement('input'));
        let id = 'fancy-radio-id-' + generateID();

        input.setAttribute('name', name);
        input.setAttribute('id', id);

        if (option.disabled === true) {
          input.setAttribute('disabled', 'disabled');
        }

        input.setAttribute('value', option.value);
        input.setAttribute('type', 'radio');

        inner.appendChild(input);

        /** @type {Element} */
        let label = inner.appendChild(d.createElement('label'));
        label.setAttribute('for', id);
        label.textContent = option.contents;

        inner.appendChild(label);
      });

      element.classList.add(classNamePrefix + 'wrapper');

      element.appendChild(inner);

      return element;
    };

    /**
     * Get a copy of the module which uses the given class name prefix.
     *
     * @param {string} prefix prefix, not null/undefined
     */
    module.forClassNamePrefix = prefix => factory(prefix);

    return module;
  };

  // (function(root, init) {
  //   if (typeof define === 'function' && define.amd) {
  //     define([], function() {
  //       return (root[moduleName] = init());
  //     });
  //   } else if (typeof module === 'object' && module.exports) {
  //     /* for CJS in a browser. Doesn't exist (yet) AFAIK, but it's not
  //      * a totally insane idea...
  //      */
  //     module.exports = root[moduleName] = init();
  //   } else {
  //     window[moduleName] = init();
  //   }
  // })(this, factory);
})();
