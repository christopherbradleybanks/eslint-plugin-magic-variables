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
      avoidName: "Avoid using variable names that are numeric or are the word form of a number i.e. '{{name}}' = {{value}}"
    }
  },

  create(context) {
    // variables should be defined here
    const {wordsToNumbers} = require('words-to-numbers')
    const kebabCase = require(`lodash/kebabCase`)
    const capitalize = require(`lodash/capitalize`)
    const get = require(`lodash/get`)
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
    const cleanNegatives = () => {
      return ''
    }
    const cleanName = (name) => {
      return kebabCase(disambiguateDecimal(name).replace(/(negative|neg|minus)_?/gi, cleanNegatives).split(`Point`).map(cleanValues).join(`Point`))
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
              const name = node.name
              const operator = get(node, `parent.init.operator`, null)
              const modifier = operator === '-' ? -1 : null
              let value = get(node, 'parent.init.value', get(node,'parent.init.argument.value', ''))
              if(value === '')
              {
                console.log(node)
              }
              value = modifier ? value * modifier : value
              context.report({
                node: node,
                messageId: "avoidName",
                data: {
                    name,
                    value,
                },
            });
          }
      },
  //     Literal(node){
  //       console.log(`Litral`, node)
  //     },
  //     VariableDeclarator(node){
  //       console.log(`Variable Declarator`, node)
  //     },
  //     UnaryExpression(node){
  //       console.log(`unary expresion`, node)
  //     }
     };
  },
};
