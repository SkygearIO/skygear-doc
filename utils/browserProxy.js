const canUseDOM = () => (typeof window !== 'undefined' && typeof document !== 'undefined');

const NullFunction = () => null;

const getWindow = () => {
  const theWindow = canUseDOM() ? window : {};

  // Defined according to the usage. Cannot find a smart way to define it.
  if (typeof theWindow.localStorage === 'undefined') {
    theWindow.localStorage = {
      getItem: NullFunction,
      setItem: NullFunction,
    };
  }

  if (typeof theWindow.location === 'undefined') {
    theWindow.location = null;
  }
  return theWindow;
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
