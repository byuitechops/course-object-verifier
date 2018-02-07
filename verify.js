/*eslint-env node, es6*/

//const chalk = require('chalk');

module.exports = (courseObj, callback) => {
   const standardProperties = [
        'logs',
        'settings',
        'info',
        'content'
    ];

   const standardInfoProperties = [
        'originalZipPath',
        'unzippedPath',
        'processedPath',
        'uploadZipPath',
        'fileName'
    ];

   const standardSettingsProperties = [
        'debug',
        'readAll',
        'online',
        'keepFiles',
        'deleteCourse',
       'lessonFolders'
    ];
   var error = null;

   /* Check if courses top level contains the standard properties */
   standardProperties.forEach((property) => {
      if (!Object.keys(courseObj).includes(property)) {
         error = new Error(`Course object missing property: ${property}`);
      }
   });

   /* Check if Info contains the standard properties */
   if (error == null) {
      standardInfoProperties.forEach((property) => {
         if (!Object.keys(courseObj.info).includes(property)) {
            error = new Error(`Course Info missing property: ${property}`);
         }
      });
   }

   /* Check if Settings contains the standard properties */
   if (error == null) {
      standardSettingsProperties.forEach((property) => {
         if (!Object.keys(courseObj.settings).includes(property)) {
            error = new Error(`Course Settings missing property: ${property}`);
         }
      });
   }

   /* Check if object contains extra properties */
   if (error == null) {
      if (Object.keys(courseObj).length > standardProperties.length ||
         Object.keys(courseObj.settings).length > standardSettingsProperties.length) {
         error = new Error('Course object provided contains extra properties it should not have');
      }
   }
   if (error == null) {
      courseObj.message('Course Object successfully verified!');
   }

   callback(error, courseObj);
};
