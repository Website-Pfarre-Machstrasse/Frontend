const escape = require('lodash/escape');
const checkstyleVersion = '4.3';

module.exports = function(stylelintResults) {
  let xml = '<?xml version="1.0" encoding="utf-8"?>';
  xml += '\n<checkstyle version="' + checkstyleVersion + '">';
  stylelintResults.forEach(function(stylelintResult) {
    if (!stylelintResult.warnings.length) {
      xml += '\n  <file name="' + escape(stylelintResult.source) + '"/>';
      return;
    }
    xml += '\n  <file name="' + escape(stylelintResult.source) + '">';
    stylelintResult.warnings.forEach(function(warning) {
      xml += '\n    <error source="' + escape('stylelint.rules.' + warning.rule) + '" ';
      xml += 'line="' + escape(warning.line) + '" ';
      xml += 'column="' + escape(warning.column) + '" ';
      xml += 'severity="' + escape(warning.severity) + '" ';
      xml += 'message="' + escape(warning.text) + '" ';
      xml += '/>';
    });
    xml += '\n  </file>';
  });
  xml += '\n</checkstyle>';
  return xml;
}
