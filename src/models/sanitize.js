'use strict';

function sanitizer(entry) {
  
  let record = {};
  // name: string
  // description: string
  // color: string

  if (typeof entry.name === 'string'){
    record.name = entry.name;
  } else {
    record.name = 'no name';
  }
  if (typeof entry.description === 'string'){
    record.description = entry.description;
  } else {
    record.description = 'no description';
  }
  if (typeof entry.color === 'string'){
    record.color = entry.color;
  } else {
    record.color = 'no color';
  }

  return record;
}

module.exports = sanitizer;