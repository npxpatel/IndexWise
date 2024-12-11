from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By 
import time
import re

siteUrl = "https://leetcode.com/problems/"

service = Service(r"C:\Users\niraj\Downloads\chromedriver-win64\chromedriver-win64\chromedriver.exe")
driver = webdriver.Chrome(service = service)

def writeToFile(links):
    file = open('Code_Scraper/taskLinks/lc_links.txt', 'w')
    for link in links:
        file.write(link + '\n')

    file.close()
        
def get_a_tags(pageUrl):
    driver.get(pageUrl)
    time.sleep(3)
 
    links = driver.find_elements(By.TAG_NAME, "a")
    response = []
 
    for link in links:
            try:
                if "/problems/" in link.get_attribute("href"):
                         if "/solution" not in link.get_attribute("href"):
                            response.append(link.get_attribute("href"))
            except:
                pass
  
    response = list(set(response))
    return response        

my_responses = []

for page in range(1, 4):
    pageUrl = siteUrl + '?page=' + str(page)
    my_responses += get_a_tags(pageUrl)


writeToFile(my_responses)

driver.quit()
       
