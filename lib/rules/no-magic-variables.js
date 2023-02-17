/**
 * @fileoverview prevent magic numbers from being used as a variable name
 * @author Chris Banks
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: `suggestion`,
    docs: {
      description: "prevent magic numbers from being used as a variable name",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options,
    messages: {
      avoidName: "Avoid using variable names that are the string < '{{ name }}' > representation of it's value < '{{ value }}' > "
    }
  },

  create(context) {
    // variables should be defined here
    const {wordsToNumbers} = require('words-to-numbers')
    const kebabCase = require(`lodash/kebabCase`)
    const capitalize = require(`lodash/capitalize`)
    const numberName = require(`number-name`)
    const UNITS = {
      0: `Zero`,
      1: `One`,
      2: `Two`,
      3: `Three`,
      4: `Four`,
      5: `Five`,
      6: `Six`,
      7: `Seven`,
      8: `Eight`,
      9: `Nine`,
    }
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------
    'use strict';
    
    const disambiguateDecimal = (name) => {
      const re = /decimal|\./gmi
      return name.replace(re, 'Point')
    }
   
    const cleanDecimals = (text) => text.replace(/\d/g, (match) => UNITS[match])
    const cleanIntegers = (text) => text.replace(/(\d)+/g, (match) => capitalize(numberName(match)))
    const cleanValues = (digits, index) => {
      if(index)
         return  cleanDecimals(digits)
        else{
         return  cleanIntegers(digits)
        }
      
    }
    const cleanName = (name) => {
      return kebabCase(disambiguateDecimal(name).split(`Point`).map(cleanValues).join(`Point`))
    }

    const isNumeric = (node) => {
      let {name} = node
      const parsedName = wordsToNumbers(cleanName(name))
      return !isNaN(parsedName)
    }
    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      Identifier(node) { 
          if (isNumeric(node)) {
              context.report({
                node: node,
                messageId: "avoidName",
                data: {
                    name: node.name,
                    value: node.parent.init.value
                },
            });
          }
      }
  };
  },
};
