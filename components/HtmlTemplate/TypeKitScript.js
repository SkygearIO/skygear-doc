import React from 'react';

const TypeKitScript = () => {
  const typekitScript = 'try{Typekit.load({ async: true });}catch(e){}';

  return (
    <section>
      <script src="https://use.typekit.net/oof1hhz.js" />
      <script dangerouslySetInnerHTML={{ __html: typekitScript }} />
    </section>
  );
};

export default TypeKitScript;
