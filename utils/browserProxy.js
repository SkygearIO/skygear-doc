const canUseDOM = () => (typeof window !== 'undefined' && typeof document !== 'undefined');

const NullFunction = () => null;

const getWindow = () => {
  if (canUseDOM()) {
    return window;
  }

  // Defined according to the usage. Cannot find a smart way to define it.
  return {
    localStorage: {
      getItem: NullFunction,
      setItem: NullFunction,
    },
    location: null,
  };
};

const getDocument = () => {
  if (canUseDOM()) {
    return document;
  }

  // Defined according to the usage. Cannot find a smart way to define it.
  return {
    location: {
      href: null,
    },
    createElement: NullFunction,
    createTextNode: NullFunction,
  };
};

module.exports = {
  canUseDOM,
  getWindow,
  getDocument,
};
