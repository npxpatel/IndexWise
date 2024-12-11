from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import os

# Setup WebDriver
service = Service(r"C:\\Users\\niraj\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)

def write_to_file(heading, body, index, page_url):
    os.makedirs('Code_Scraper/leetcode/taskContent', exist_ok=True)
    os.makedirs('Code_Scraper/leetcode/taskLinks', exist_ok=True)
    os.makedirs('Code_Scraper/leetcode/taskHeadings', exist_ok=True)

    with open(f'Code_Scraper/leetcode/taskContent/LC_task{index}.txt', 'w', encoding="utf-8") as file:
        file.write(f"{index}\t{heading}\n{body}")

    with open(f'Code_Scraper/leetcode/taskLinks/LC_link{index}.txt', 'w', encoding="utf-8") as file:
        file.write(page_url)

    with open(f'Code_Scraper/leetcode/taskHeadings/LC_headings{index}.txt', 'w', encoding="utf-8") as file:
        file.write(heading)

def page_data(page_url, index):
    try:
        driver.get(page_url)
        
        # Wait for the heading and body to be present
        wait = WebDriverWait(driver, 5)
        heading = driver.title
        body = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.elfjS[data-track-load="description_content"]'))).text

        if body:
            write_to_file(heading, body, index, page_url)
    except Exception as e:
        print(f"Error: {e}\nURL: {page_url}")

def main_function():
    index = 1
    links = []

    with open('Code_Scraper/taskLinks/lc_links.txt', 'r') as file:
        links = file.readlines()

    for link in links:
        page_data(link.strip(), index)
        index += 1

    driver.quit()

if __name__ == "__main__":
    main_function()
