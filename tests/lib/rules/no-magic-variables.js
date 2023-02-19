/**
 * @fileoverview prevent magic numbers from being used as a variable name
 * @author no-magic-numbers
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-magic-variables"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-magic-numbers", rule, {
  valid: [
    {
      code: 'var TAX = 10;',
    },
    {
      code: "var UNAUTHORIZED = 401;",
      errors: [
        {
            messageId: "avoidName"
        }
      ]
    }
  ],

  invalid: [
    {
      code: "var ZeroPoint999 = 0.999;",
      errors: [
        {
            messageId: "avoidName"
        }
      ]
    },
    {
      code: "var TWENTY_FIVE = 25;",
      errors: [
        {
            messageId: "avoidName"
        }
      ]
    },
    {
      code: "var NEGATIVE_10 = -10;",
      errors: [{
        messageId: "avoidName"
      }]
    },
    {
      code: "var NEG_10 = -10;",
      errors: [{
        messageId: "avoidName"
      }]
    },
  ],
});
