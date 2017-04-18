// ==UserScript==
// @name         Hide by tags
// @namespace    http://babanin.de/
// @version      0.8
// @description  try to take over the world! and hide gitlab issues by tags
// @author       Daniil Babanin
// @homepageURL  https://github.com/DaniilBabanin/hideIssuesByTag
// @supportURL   https://github.com/DaniilBabanin/hideIssuesByTag/issues
// @match        https://gitlab.com/*/*/issues*
// @match        https://gitlab.com/*/issues*
// @grant        none
// @license      MIT
// ==/UserScript==
(function() {
  hideGitlabTags();
  window.setInterval(hideGitlabTags, 500);
})();
function hideGitlabTags() {
  'use strict';
  var opacityLables = [
    'Ready for(.*)Test',
    'Ready for Release',
    'Blocked',
    'Concept',
    'Draft',
    'won\'t fix',
    'Suggestion',
    'Input Needed',
    'Ready for Release'
  ];
  var ignoreLables = [
  ];

  [].forEach.call(document.getElementsByClassName('issue'), function(issue) {
    var tagElems = issue.getElementsByTagName('a');

    if (tagElems.length < 3) {
      return;
    }

    [].forEach.call(tagElems, function(elem, index) {
      if (index < 2) {
        return;
      }
      if(elem && elem.getElementsByTagName('span').length){
        var tagText = elem.getElementsByTagName('span')[0].innerHTML;
        if(ignoreLables.indexOf(String(tagText)) !== -1){
          issue.style.display = 'none';
          return;
        }
        for ( var i in opacityLables ) {
          var label = opacityLables[i];
          if ( typeof(label) !== "string" ) {

            continue;
          }
          if ( String(tagText).match(label) !== null ) {
        issue.style.opacity = 0.5;
        return;
      }
    }
      }
    });
  });
}