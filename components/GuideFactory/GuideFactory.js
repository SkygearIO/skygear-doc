import React, { Component } from 'react';
import Guide from '../../components/Guide';

export default function (options) {
  const {
    name,
    menu,
    title,
    content,
  } = options;

  return () => {
    return (
      <Guide
        sectionName={name || 'Guide Template'}
        menu={menu}
        title={title}
        content={content || ''}
      />
    );
  };
};
