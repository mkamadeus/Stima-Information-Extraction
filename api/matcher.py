
def kmp_border(pattern):
    result = []
    print(pattern)
    for index, character in enumerate(pattern):
        k = index - 1

        if(k == -1):
            continue

        # Find largest index value
        j = k
        found = False
        while(not found and j>0):
            if(pattern[0:j] == pattern[k+1-j:k+1]):
                found = True
            else:
                j -= 1

        # Store border function value  
        result.append(j)
    
    return result       

def booyer_moore(sentence, pattern):
    print('12213213')

def knuth_morris_pratt(sentence, pattern):
    # Precompute border values
    border_values = kmp_border(pattern)
    border_function = lambda index : border_values[index]

    # Search for pattern
    i = 0
    j = 0
    found = False
    while(not found and i+j < len(sentence)):

        # Search for mismatch
        mismatch = False
        while(not mismatch and j<len(pattern) and i+j < len(sentence)):
            if(sentence[i+j] != pattern[j]):
                mismatch = True
            else:
                j += 1
        
        # If there are no mismatch (pattern found), set flag
        if(not mismatch):
            found = True
        else:
            # Calculate new index
            if(j == 0):
                i += 1
                j = 0
            else:
                i = i+j - border_function(j-1)
                j = border_function(j-1)
    
    # Return occurence index
    return i

print(knuth_morris_pratt("abacaabaccabacabaab", "abacab"))
