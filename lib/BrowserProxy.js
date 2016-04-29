import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import createHistory from 'history/lib/createBrowserHistory';
import useQueries from 'history/lib/useQueries';

let History;
let Window;
let Document;

if (canUseDOM) {
  History = useQueries(createHistory)();
  Window = window;
  Document = document;
} else {
  const emptyFunc = () => {};

  History = {
    listen: emptyFunc,
    pushState: emptyFunc,
  };

  Window = {
    pageXOffset: 0,
    pageYOffset: 0,
    location: {},

    ga: emptyFunc,
    scrollBy: emptyFunc,
    scrollTo: emptyFunc,
    setInterval: emptyFunc,
    clearInterval: emptyFunc,
    addEventListener: emptyFunc,
    removeEventListener: emptyFunc,
  };

  Document = {
    getElementById: emptyFunc,
    getElementsByName: emptyFunc,
  }
}

export default { History, Window, Document };
