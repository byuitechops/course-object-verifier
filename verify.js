/*eslint-env node, es6*/

const chalk = require('chalk');

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
        'online',
        'readAll',
        'keepFiles',
        'deleteCourse'
    ];

    var foundErr = false;

    /* Check if courses top level contains the standard properties */
    if (!foundErr) {
        standardProperties.forEach((property) => {
            if (!Object.keys(courseObj).includes(property)) {
                callback(`Course object missing property: ${property}`, courseObj);
                foundErr = true;
                return false;
            }
        });
    } else {
        return;
    }

    /* Check if Info contains the standard properties */
    if (!foundErr) {
        standardInfoProperties.forEach((property) => {
            if (!Object.keys(courseObj.info).includes(property)) {
                callback(`Course Info missing property: ${property}`, courseObj);
                foundErr = true;
                return false;
            }
        });
    } else {
        return;
    }

    /* Check if Settings contains the standard properties */
    if (!foundErr) {
        standardSettingsProperties.forEach((property) => {
            if (!Object.keys(courseObj.settings).includes(property)) {
                callback(`Course Settings missing property: ${property}`, courseObj);
                foundErr = true;
                return false;
            }
        });
    } else {
        return;
    }

    /* Check if object contains extra properties */
    if (!foundErr) {
        if (Object.keys(courseObj).length > standardProperties.length ||
            Object.keys(courseObj.settings).length > standardSettingsProperties.length) {
            foundErr = true;
            callback(`Course object provided contains extra properties it should not have`, courseObj);
            return false;
        }
    } else {
        return;
    }

    courseObj.message('Course Object successfully verified!');
    callback(null, courseObj);
};
