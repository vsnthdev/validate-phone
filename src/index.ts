/*
 *  Contains a function that validates & returns details on a phone number.
 *  Created On 06 October 2023
 */

import { codes } from './codes.js'

/** Given a phone number in string, returns it's country
 *  code + other useful information, if it's a valid phone number.
 * 
 * @param {string} number The phone number you'd like to validate.
 */
export function validatePhoneNumber(number: string) {
    const digits = number.match(/[0-9]/gi).join('')

    for (const code of codes) {
        // doesn't start with the country code
        if (!digits.startsWith(code.phone)) continue

        // when there's no phone length we've of that country
        // we can only check by country code & can't confirm the length
        if (!code.phoneLength) return code

        // if phone number length is an array
        if (Array.isArray(code.phoneLength)) {
            // loop through
            for (const len of code.phoneLength) {
                if (len + code.phone.length == digits.length) {
                    return code
                } else {
                    continue
                }
            }
        } else {
            // if phone number length is single integer
            if (code.phoneLength + code.phone.length == digits.length) {
                return code
            } else {
                continue
            }
        }

        return code
    }
}
