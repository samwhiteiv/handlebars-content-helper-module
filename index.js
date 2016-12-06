/**
 * Handlebars Helpers: Content
 * Licensed under the MIT License (MIT).
 */
'use strict';


// Node.js
//var fs = require('fs');
// node_modules
//var _ = require('lodash');
// Local utils
//var Utils = require('../utils/utils');

// The module to be exported
var helpers = {

  /**
  *custom helpers
  */

  /**
   * {{cdnify}}
   *
   */
  cdnify: function (data) {
    var cdnBaseUrl = '';
    var apiBaseUrl = '';

    if (typeof data === 'string') {
        data = String(data).replace(new RegExp('src="/sites/default/files/content','g'), 'src="' + cdnBaseUrl);
        data = String(data).replace(new RegExp('src="' + apiBaseUrl + '/sites/default/files/content','g'), 'src="' + cdnBaseUrl);
        data = String(data).replace(new RegExp('' + apiBaseUrl + '/sites/default/files/content','g'), cdnBaseUrl);
    }
    if (typeof data === 'object') {
      data = String(data).replace(new RegExp('src="/sites/default/files/content','g'), 'src="' + cdnBaseUrl);
      data = String(data).replace(new RegExp('src="' + apiBaseUrl + '/sites/default/files/content','g'), 'src="' + cdnBaseUrl);
      data = String(data).replace(new RegExp('' + apiBaseUrl + '/sites/default/files/content','g'), cdnBaseUrl);
    }
    return data;
  },

  /**
   * {{getContent}}
   * -swhite
   * note: data must be an object
   * Text section target body value like so - please note use double quotes for JSON formatting: var value = '[0]["body"][0]["value"]';
   */
  getContent: function (data, nid, value, cdn) {

    var cdnBaseUrl = '';
    var apiBaseUrl = '';
    var content = data.filter(function(v){ return v["nid"]["0"]["value"] === nid; });
    var content_value = content;

    if (content.length > 0) {
      //var cdnBaseUrl = 'http://cdn.clusterfest.com.s3-website-us-east-1.amazonaws.com';
      if (value === 'body') {
        //note: must use double quotes for JSON formatting
        var content_value = content[0]["body"][0]["value"];
      }
      else if (value === 'title') {
        var content_value = content[0]["title"][0]["value"];
      }
      else if (value === 'field_image') {
        var content_value = content[0]["field_image"][0]["url"];
      }
      else {
        var content_value = content[0]["body"][0]["value"];
      }
      if (cdn = true) {
        content_value = String(content_value).replace(new RegExp('src="/sites/default/files/content','g'), 'src="' + cdnBaseUrl);
        content_value = String(content_value).replace(new RegExp('src="' + apiBaseUrl + '/sites/default/files/content','g'), 'src="' + cdnBaseUrl);
        content_value = String(content_value).replace(new RegExp('' + apiBaseUrl + '/sites/default/files/content','g'), cdnBaseUrl);
      }
      else if (cdn = false) {
        //
      }
      else {
        content_value = String(content_value).replace(new RegExp('src="/sites/default/files/content','g'), 'src="' + cdnBaseUrl);
        content_value = String(content_value).replace(new RegExp('src="' + apiBaseUrl + '/sites/default/files/content','g'), 'src="' + cdnBaseUrl);
        content_value = String(content_value).replace(new RegExp('' + apiBaseUrl + '/sites/default/files/content','g'), cdnBaseUrl);
      }
      return content_value;
    }
    else {
      console.log('Content NID not found. This content cannot be displayed');
      return '<p>Sorry for the inconvenience. This content cannot be displayed</p>';
    }
  }

};

// Export helpers
module.exports.register = function (Handlebars, options) {
  options = options || {};

  for (var helper in helpers) {
    if (helpers.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, helpers[helper]);
    }
  }

};
