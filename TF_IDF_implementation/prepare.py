import math
import json
import os
import re

# re for regular expression

# here each question is a doc and all doc makes it a corpus.

def IDF(corpus):
    IDF_score = {}
    inverse_map = {}
    idx = 0

    for doc in corpus:
        doc = set(doc.split())
        for word in doc:
            if word not in IDF_score:
                IDF_score[word] = 1
            else:
                IDF_score[word] += 1   

            if word not in inverse_map:
                inverse_map[word] = []
            inverse_map[word].append(idx)       

        idx += 1   

    for word in IDF_score:
        IDF_score[word] = 1 + math.log(len(corpus) / IDF_score[word])      

    return IDF_score, inverse_map


def TF(corpus, IDF, inverse_map):
    TF_score = {}

    for word in IDF:
        TF_score[word] = {}
        list = inverse_map[word]

        for idx in list:
            doc = corpus[idx]
            doc = doc.split()
            if word in doc:
               TF_score[word][idx] =  doc.count(word) / len(doc) 
            else:
                TF_score[word][idx] = 0

    return TF_score           


def TF_IDF(TF, IDF):
    TF_TDF_score = {}
    
    for word in IDF:
        TF_TDF_score[word] = {}
        for idx in TF[word]:
            TF_TDF_score[word][idx] = TF[word][idx] * IDF[word]

    return TF_TDF_score     



def cleanedData(data):
    data = data.lower()
    data = data.split("Example 1")[0]
    regex = r'[^a-zA-Z\s]'
    data = re.sub(regex, ' ', data)
    data = data.replace('\n', ' ')
    
    data = ' '.join([word for word in data.split() if len(word) > 3])

    return data

def main():
    corpus = []
    lc_taskSize = 180

    path_name = f'Code_Scraper/leetcode/taskContent/'

    for file in range(1, lc_taskSize):
        try:
            with open(path_name + 'LC_task' + str(file) + '.txt', 'r') as f:
                data = f.read()
                data = cleanedData(data)
                corpus.append(data)
        except:
            pass
    
    
    output = IDF(corpus)
    idf, inverse_map = output[0], output[1]
    tf = TF(corpus, idf, inverse_map)

    tf_idf_scores = TF_IDF(tf, idf)

    with open('TF_IDF_implementation/output.json', 'w') as f:
        json.dump(tf_idf_scores, f)

    with open('TF_IDF_implementation/doc.json', 'w') as f:
        json.dump(corpus, f)    

    doc_links = []
    doc_names = []

    path_name = f'Code_Scraper/leetcode/taskLinks/'

    for file in range(1, lc_taskSize):
        try:
            with open(path_name + 'LC_link' + str(file) + '.txt', 'r') as f:
                data = f.read()
                doc_links.append(data)
                f.close()
        except:
            pass    
     
    with open('TF_IDF_implementation/doc_links.json', 'w') as f:
        json.dump(doc_links, f)
     
    path_name = f'Code_Scraper/leetcode/taskHeadings/'

    for file in range(1, lc_taskSize):
        try:
            with open(path_name + 'LC_headings' + str(file) + '.txt', 'r') as f:
                data = f.read()
                data = cleanedData(data)
                doc_names.append(data)
                f.close()
        except:
            pass
    
    with open('TF_IDF_implementation/doc_names.json', 'w') as f:
        json.dump(doc_names, f)

if __name__ == '__main__':
    main()