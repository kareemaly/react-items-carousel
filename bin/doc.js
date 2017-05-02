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

const getComponentReadmeProps = (component) => {
  const componentInfo = reactDocs.parse(component);

  let readmeProps = `| Property | Type | Default | Description |
| --- | --- | --- | --- |`;

  for(const propertyName in componentInfo.props) {
    const propInfo = componentInfo.props[propertyName];
    let propertyType = propInfo.type.name;
    const propertyRequired = propInfo.required;
    const propertyDefault = propInfo.defaultValue ? propInfo.defaultValue.value : '';
    const propertyDescription = propInfo.description;

    if(propertyType === 'arrayOf') {
      propertyType += ` (${propInfo.type.value.name})`;
    }

    if(propertyType === 'shape') {
      propertyType += ` (${_.keys(propInfo.type.value).join(', ')})`;
    }

    readmeProps += `
| ${propertyName}${propertyRequired ? '*' : ''} | ${propertyType} | ${propertyDefault} | ${propertyDescription.replace('|', ':').replace('\n', '<br />')} |`;
  }

  return readmeProps;
}
