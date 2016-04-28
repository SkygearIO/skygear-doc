/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import createHistory from 'history/lib/createBrowserHistory';
import useQueries from 'history/lib/useQueries';

const History = canUseDOM ? useQueries(createHistory)() : {};
const Window = canUseDOM ? window : undefined;
const WindowLocation = Window ? Window.location : {};

export default { History, Window, WindowLocation };
