const reactDocs = require('react-docgen');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const glob = require("glob");

glob(path.join(__dirname, '../src/*/index.js'), function(err, files) {
  if(files.length === 0) {
    throw new Error("No index file for the component!");
  }
  if(files.length > 1) {
    throw new Error("More than index file found for the component!");
  }
  const component = fs.readFileSync(files[0]).toString();
  const readmeProps = getComponentReadmeProps(component);

  const actualReadme = fs.readFileSync(path.join(__dirname, '../README.md')).toString();
  const pieces = actualReadme.split('Contributing');
  const before = pieces[0].split('| Property')[0];

  fs.writeFileSync(path.join(__dirname, '../README.md'), 
  `${before}${readmeProps}

Contributing${pieces[1]}`);
});


const propTypeToString = (type) => {
  let propertyType = type.name;

  if(type.name === 'arrayOf') {
    propertyType += ` (${propTypeToString(type.value)})`;
  }

  if(type.name === 'shape') {
    const shapeString = _.keys(type.value).map(key => '`' + key + ': ' + type.value[key].name + '`').join('<br />');
    propertyType += ` {<br />${shapeString}<br />}`;
  }

  if(type.name === 'enum') {
    propertyType += ` (${type.value.map(val => val.value).join(', ')})`;
  }

  if(type.name === 'union') {
    propertyType += ` (<br />${type.value.map(propTypeToString).join(',<br />')}<br />)`;
  }

  return propertyType;
}

const getComponentReadmeProps = (component) => {
  const componentInfo = reactDocs.parse(component);

  let readmeProps = `| Property | Type | Default | Description |
| --- | --- | --- | --- |`;

  for(const propertyName in componentInfo.props) {
    const propInfo = componentInfo.props[propertyName];
    const propertyRequired = propInfo.required;
    const propertyDefault = propInfo.defaultValue ? propInfo.defaultValue.value : '';
    const propertyDescription = propInfo.description;
    const propertyType = propTypeToString(propInfo.type);

    readmeProps += `
| ${propertyName}${propertyRequired ? '*' : ''} | ${propertyType} | ${propertyDefault} | ${propertyDescription.replace('|', ':').replace(/\n/g,'<br />')} |`;
  }

  return readmeProps;
}
