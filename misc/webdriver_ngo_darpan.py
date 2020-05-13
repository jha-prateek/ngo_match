from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver import Chrome
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from tqdm import tqdm

import pandas as pd
import time

path= r'C:\chromeWebdriver\chromedriver.exe'

def getdata(start_url):
    browser = webdriver.Chrome(path)
    browser.get(start_url)
    table = browser.find_element_by_class_name('table-striped')
    table_rec = table.find_element_by_tag_name('tbody').find_elements_by_css_selector('tr')

    idx = 0
    for row in tqdm(table_rec):
        row_record = []
        idx += 1
        element = row.find_elements_by_tag_name('td')[1].find_element_by_tag_name('a')
        browser.execute_script("arguments[0].click();", element)
        time.sleep(0.75)
        ngo_dialog = browser.find_element_by_id('ngo_info_modal')\
                    .find_element_by_class_name('modal-dialog')\
                    .find_element_by_class_name('modal-content')\
                    .find_element_by_class_name('modal-body')\
                    .find_element_by_class_name('container')\
                    .find_element_by_class_name('row')
        # print('NGO Name: ' + ngo_dialog
        #       .find_element_by_class_name('h3style')
        #       .find_element_by_id('ngo_name_title').text
        # )
        
        contact_details = ngo_dialog\
              .find_elements_by_class_name('w3-table-all')[-1]\
              .find_element_by_tag_name('tbody')\
              .find_elements_by_tag_name('tr')

        row_record.append(ngo_dialog.find_element_by_class_name('h3style').find_element_by_id('ngo_name_title').text)

        for row in contact_details:
            row_val = row.find_elements_by_tag_name('td')
            if(row_val[0].text == 'Address'):
                row_record.append(row_val[1].text)
            elif(row_val[0].text == 'City'):
                row_record.append(row_val[1].text)
            elif (row_val[0].text == 'State'):
                row_record.append(row_val[1].text)
            elif (row_val[0].text == 'Telephone'):
                row_record.append(row_val[1].text)
            elif (row_val[0].text == 'Mobile No'):
                row_record.append(row_val[1].text)
            elif (row_val[0].text == 'E-mail'):
                row_record.append(row_val[1].text)
            elif (row_val[0].text == 'Website Url'):
                row_record.append(row_val[1].text)
        close_button = browser.find_element_by_id('ngo_info_modal')\
        .find_element_by_class_name('modal-dialog')\
        .find_element_by_class_name('modal-content')\
        .find_element_by_class_name('modal-header')\
        .find_element_by_tag_name('button')\

        browser.execute_script("arguments[0].click();", close_button)
        time.sleep(0.75)

        df = pd.DataFrame([row_record] , columns=['ngo_name','full_address','city','state', 'contact_1', 'contact_2', 'website', 'mail'])
        df.to_csv('raw_karnataka_1_19.csv', mode='a', header=False)
    browser.quit()

for page in range(20, 53):
    url = 'https://ngodarpan.gov.in/index.php/home/statewise_ngo/5221/29/' +  str(page) + '?per_page=100'
    print(url)
    try:
        getdata(url)
    except:
        pass