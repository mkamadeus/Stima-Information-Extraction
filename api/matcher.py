import regex as re
from nltk.tokenize import sent_tokenize

import nltk
nltk.download('punkt')

# Returns border function of a pattern


def kmp_border(pattern):
    result = []
    for index, character in enumerate(pattern):
        k = index - 1

        if(k == -1):
            continue

        # Find largest index value
        j = k
        found = False
        while(not found and j > 0):
            if(pattern[0:j] == pattern[k+1-j:k+1]):
                found = True
            else:
                j -= 1

        # Store border function value
        result.append(j)

    return result

# Returns the last occurence of each character


def last_occurrence(pattern):
    result = {}
    for index, character in enumerate(pattern):
        result[character] = index

    return result

# String matching using the Boyer-Moore Algorithm


def boyer_moore(pattern, sentence):
    # Precompute occurence
    occurrence_values = last_occurrence(pattern)
    def occurrence_function(
        character): return occurrence_values.get(character, -1)

    # Initialize index
    m = len(pattern)
    i = m - 1
    j = m - 1

    # Search for pattern
    while(i >= 0 and i < len(sentence)):

        # Search for mismatch
        mismatch = False
        while(not mismatch and j >= 0):
            if(pattern[j] != sentence[i]):
                mismatch = True
            else:
                i -= 1
                j -= 1

        # If found, return index of occurence
        if(not mismatch):
            return i+1
        else:
            i = i + m - min(j, 1 + occurrence_function(sentence[i]))
            j = m - 1

    return -1

# String matching using the KMP Algorithm


def knuth_morris_pratt(pattern, sentence):
    # Precompute border values
    border_values = kmp_border(pattern)
    def border_function(index): return border_values[index]

    # Search for pattern
    i = 0
    j = 0
    found = False
    while(not found and i+j < len(sentence)):

        # Search for mismatch
        mismatch = False
        while(not mismatch and j < len(pattern) and i+j < len(sentence)):
            if(sentence[i+j] != pattern[j]):
                mismatch = True
            else:
                j += 1

        # If there are no mismatch (pattern found), set flag
        if(not mismatch):
            found = True
            return i
        else:
            # Calculate new index
            if(j == 0):
                i += 1
                j = 0
            else:
                i = i+j - border_function(j-1)
                j = border_function(j-1)

    # Return occurence index
    return -1


def regex_matching(pattern, sentence):
    if(not re.search(pattern, sentence)):
        return -1
    else:
        return re.search(pattern, sentence).start()


def split_to_sentences(paragraph):
    return sent_tokenize(paragraph)


def extract_sentence_date(sentence):
    result = sentence
    date = None
    date_patterns = [
        r'\b[0-9]*/[0-9]*/[0-9]*\b',
        r'\b\w* [0-9][0-9]? \w* [0-9]+\b',
        r'\b\w*, [0-9][0-9]? \w* [0-9]+\b',
        r'\spukul [0-9][0-9].[0-9][0-9]\b',
        r'\sjam [0-9][0-9].[0-9][0-9]\b',
        r'\spukul [0-9][0-9]:[0-9][0-9]\b',
        r'\sjam [0-9][0-9]:[0-9][0-9]\b',
        r'\bkemarin\b',
        r'\bbesok\b',
        r'\blusa\b',
        r'\bhari ini\b',
    ]

    for pattern in date_patterns:
        if(not date):
            date = re.search(pattern, result)
        result = re.sub(
            '(' + pattern + ')', r'<span class="text-purple-700 font-bold">\1</span>', result)

    if(not date):
        date = ""
    else:
        date = date.group()

    return result, date


def extract_sentence_count(sentence, match_index):
    result = sentence
    count = None
    difference = 9999
    number_patterns = [
        r'([0-9][0-9]?[0-9]?((.|,)[0-9][0-9][0-9])* (P|p)asien)',
        r'([0-9][0-9]?[0-9]?((.|,)[0-9][0-9][0-9])* (O|o)rang)',
    ]
    for pattern in number_patterns:
        tmp_count = re.search(pattern, result)
        if(tmp_count != None):
            if(abs(tmp_count.start() - match_index) < difference):
                difference = abs(tmp_count.start() - match_index)
                count = re.search(pattern, result)
        result = re.sub(pattern, r'<u>\1</u>', result)

    if(not count):
        count = ""
    else:
        count = count.group()

    return result, count


def extract_sentence_information(sentence, keyword, matching_function):
    # Get keyword match index
    match_index = matching_function(keyword, sentence.lower())

    result = ""

    if(match_index != -1):
        result = re.sub(
            '(' + keyword + ')', r'<span class="text-purple-700 font-bold">\1</span>', sentence, flags=re.I)

        result, date = extract_sentence_date(result)
        result, count = extract_sentence_count(result, match_index)

        return result, date, count
    else:
        return result, "", ""
