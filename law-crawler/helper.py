"""
  Copyright (C) 2023 tghuy

  This file is part of VN-Law-Advisor.

  VN-Law-Advisor is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  VN-Law-Advisor is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with VN-Law-Advisor.  If not, see <http://www.gnu.org/licenses/>.
"""
import re


def convert_roman_to_num(roman_num):
    roman_num = roman_num.upper()
    roman_to_num = {'I': 10, 'V': 50, 'X': 100, 'L': 500, 'C': 1000, 'D': 5000, 'M': 10000}
    alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    num = 0
    for i in range(len(roman_num)):
        romain_char = roman_num[i]
        if romain_char not in roman_to_num.keys():
            num += alphabet.index(romain_char) + 1
            continue
        if i > 0 and roman_to_num[romain_char] > roman_to_num[roman_num[i - 1]]:
            num += roman_to_num[romain_char] - 2 * roman_to_num[roman_num[i - 1]]
        else:
            num += roman_to_num[romain_char]
    return num


def extract_input(input_string):
    # Define a regular expression pattern to match the content inside parentheses
    pattern = r"\((.*?)\)"

    # Use re.search to find the first match in the input string
    match = re.search(pattern, input_string)

    # Check if a match is found
    if match:
        # Extract and return the content inside parentheses
        return match.group(1)
    else:
        # Return None if no match is found
        return None