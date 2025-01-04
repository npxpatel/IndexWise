import os
import sys
import json


def process_query(tf_idf_data, doc_links, doc_titles, docs):
     query = sys.argv[1] if len(sys.argv) > 1 else input("Enter your query: ")
     query_terms = query.lower().split()
     relevant_docs = {}
     search_results = []

     try:
          for term in query_terms:
               if term in tf_idf_data:
                    for doc_index, score in tf_idf_data[term].items():
                         if doc_index in relevant_docs:
                              relevant_docs[doc_index] += score
                         else:
                              relevant_docs[doc_index] = score

          sorted_docs = sorted(relevant_docs.items(), key = lambda item: item[1], reverse = True) 

          for index, _ in sorted_docs:
               doc_index = int(index)
               result = f"{doc_links[doc_index]}*{docs[doc_index]}"
               search_results.append(result)

     except Exception as e:
          print(f"Err in processing query : {e}")
   
    
     # Remove duplicates while preserving order
     search_results = list(dict.fromkeys(search_results))


     print(json.dumps(search_results))

     return search_results


if __name__ == '__main__':
    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        tf_idf_path = os.path.join(script_dir, 'output.json')
        doc_data_path = os.path.join(script_dir, 'doc.json')
        links_path = os.path.join(script_dir, 'doc_links.json')
        titles_path = os.path.join(script_dir, 'doc_names.json')


        with open(tf_idf_path, 'r') as file:
            tf_idf_data = json.load(file)

        with open(doc_data_path, 'r') as file:
            docs = json.load(file)

        with open(links_path, 'r') as file:
            doc_links = json.load(file)

        with open(titles_path, 'r') as file:
            doc_titles = json.load(file)
            

    except Exception as e:
        print(f"Error loading files: {e}")
        sys.exit(1)


    results = process_query(tf_idf_data, doc_links, doc_titles, docs)
    