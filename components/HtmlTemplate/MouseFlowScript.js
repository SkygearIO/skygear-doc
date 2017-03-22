import React, { PropTypes } from 'react';

const MouseFlowScript = ({ projectID }) => {
  if (!projectID) {
    return null;
  }

  const mouseflowScript = `
    var _mfq = _mfq || []; (function() {
      var mf = document.createElement("script");
      mf.type = "text/javascript"; mf.async = true;
      mf.src = "//cdn.mouseflow.com/projects/${projectID}.js";
      document.getElementsByTagName("head")[0].appendChild(mf);
    })();`;

  return <script dangerouslySetInnerHTML={{ __html: mouseflowScript }} />;
};

MouseFlowScript.propTypes = {
  projectID: PropTypes.string,
};

export default MouseFlowScript;
