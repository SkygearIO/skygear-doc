import React from 'react';

const MouseFlowScript = () => {
  const mouseflowScript = `var _mfq = _mfq || []; (function() {
    var mf = document.createElement("script");
	mf.type = "text/javascript"; mf.async = true;
	mf.src = "//cdn.mouseflow.com/projects/b0d2d2a4-d999-46f2-bec8-3b8e0ac92958.js";
	document.getElementsByTagName("head")[0].appendChild(mf);
	})();`;

  return <script dangerouslySetInnerHTML={{ __html: mouseflowScript }} />;
};

export default MouseFlowScript;
