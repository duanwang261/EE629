import pandas as pd
from bs4 import BeautifulSoup
from lxml import etree
import requests
import pymysql
from requests.api import get
pymysql.install_as_MySQLdb()
from sqlalchemy import create_engine
import numpy as np
from tqdm import trange
import time
import string
import re


def find_word_index(sentence, word):
    word_length = len(word)
    for i in range(len(sentence) - word_length + 1):
        if  sentence[i:i + word_length] == word:
            return i
    return -1
#test
sentence="I am good"
find_word_index(sentence,"state")



def drop_pun(adm):
    if len(adm) < 1:
        return 'NaN'
    else:
        str = adm[0]
        str = re.sub('%','',str)
        str = re.sub(' ','',str)
        str = re.sub('\r','',str)
        return str
#test
drop_pun(['68%'])



def find_num_helper(sentence):
    pattern = re.compile(r'(?<=)\d+\.?\d*')
    target = pattern.findall(sentence)
    return target
    
# find_num_helper('Undergraduate Student Gender:\r\nMale: 49%\r\nFemale: 51%')
# find_num_helper('Undergraduate Race/ethnicity:\r\nAmerican Indian or Alaska Native: 1%\r\nAsian: 25%\r\nBlack or African American: 7%\r\nHispanic/Latino: 17%\r\nNative Hawaiian or other Pacific Islander: 0%\r\nWhite: 29%\r\nTwo or more races: 10%\r\nRace/ethnicity unknown: 0%\r\nNon-resident alien: 11%')

def SAT_clean(SAT25_writing, SAT75_writing, SAT25_math, SAT75_math):
    try:
        SAT_25_50_75 = []
        SAT25 = (int(SAT25_writing[0]) + int(SAT25_math[0])) / 2
        SAT75 = (int(SAT75_writing[0]) + int(SAT75_math[0])) / 2
        SAT50 = (SAT25 + SAT75) / 2
        SAT_25_50_75.append(SAT25)
        SAT_25_50_75.append(SAT50)
        SAT_25_50_75.append(SAT75)
        return SAT_25_50_75
    except:
        return ['NaN', 'NaN', 'NaN']
    
    
    
def ACT_clean(ACT25_composite, ACT75_composite, ACT25_english, ACT75_english, ACT25_math, ACT75_math):
    try:
        ACT_25_50_75 = []
        ACT25 = (int(ACT25_composite[0]) + int(ACT25_english[0]) + int(ACT25_math[0])) / 3
        ACT75 = (int(ACT75_composite[0]) + int(ACT75_english[0]) + int(ACT75_math[0])) / 3
        ACT50 = (ACT25 + ACT75) / 2
        ACT_25_50_75.append(ACT25)
        ACT_25_50_75.append(ACT50)
        ACT_25_50_75.append(ACT75)
        return ACT_25_50_75
    except:
        return ['NaN', 'NaN', 'NaN']
    
    
    
def Race_clean(race):
    if len(race) != 9:
        return ['NaN','NaN','NaN','NaN','NaN','NaN','NaN']
    else:
        #  white_nonwhite_asian_black_alien_hispanic_other
        races = []
        races.append(int(race[5]))
        races.append(100 - int(race[5]))
        races.append(int(race[1]))
        races.append(int(race[2]))
        races.append(int(race[8]))
        races.append(int(race[3]))
        races.append(int(race[0]) + int(race[4]) + int(race[6]) + int(race[7]))
        return races
    
    
    
def basic_info(schoolname, address):
    basicInfo = []
    if (schoolname):
        basicInfo.append(str(schoolname))
    else: 
        basicInfo.append('NaN')   
    if (address):
        basicInfo.append(str(address))
    else: 
        basicInfo.append('NaN')   
   
    return basicInfo



def getDataFromPage(tempId):
    enrollmentURL = 'https://nces.ed.gov/collegenavigator/?id=' + str(tempId) + '#enrolmt'
    admissonURL = 'https://nces.ed.gov/collegenavigator/?id=' + str(tempId) + '#admsns'
#     print(enrollmentURL)
#     print(admissonURL)
    try:
        req = requests.get(enrollmentURL)
        ret = req.content.decode('utf-8')
        soup = BeautifulSoup(ret, 'html.parser')
        dom = etree.HTML(str(soup))
        imgs = soup.findAll("img")
        
        schoolname = dom.xpath('//*[@id="RightContent"]/div[4]/div/div[2]/span/span/text()')
        address = dom.xpath('//*[@id="RightContent"]/div[4]/div/div[2]/span/text()')
        basicInfo = basic_info(schoolname[0], address[0])
    
        total_students = dom.xpath('//*[@id="divctl00_cphCollegeNavBody_ucInstitutionMain_ctl03"]/div/table[1]/thead/tr/th[2]/text()')
        undergraduate = dom.xpath('//*[@id="divctl00_cphCollegeNavBody_ucInstitutionMain_ctl03"]/div/table[1]/tbody/tr[1]/td[2]/text()')
        graduate = dom.xpath('//*[@id="divctl00_cphCollegeNavBody_ucInstitutionMain_ctl03"]/div/table[1]/tbody/tr[3]/td[2]/text()')

        for img in imgs:
            if find_word_index(img['alt'], 'Student Gender') != -1:
                gender = find_num_helper(img['alt'])
#                 print(gender)
                

            if find_word_index(img['alt'], ' Race/ethnicity') != -1:
                race_get = find_num_helper(img['alt'])
                #white_nonwhite_asian_black_alien_hispanic_other
                races = Race_clean(race_get)
#                 print(races)
            
        UNITID = tempId
#         print(UNITID)
        admi_req = requests.get(admissonURL)
        admi_ret = admi_req.content.decode('utf-8')
        admi_soup = BeautifulSoup(admi_ret, 'html.parser')
        admi_dom = etree.HTML(str(admi_soup))
        SAT25_writing = admi_dom.xpath('//*[@id="divctl00_cphCollegeNavBody_ucInstitutionMain_ctl04"]/div/table[5]/tbody/tr[1]/td[2]/text()')
        SAT75_writing = admi_dom.xpath('//*[@id="divctl00_cphCollegeNavBody_ucInstitutionMain_ctl04"]/div/table[5]/tbody/tr[1]/td[3]/text()')
        SAT25_math = admi_dom.xpath('//*[@id="divctl00_cphCollegeNavBody_ucInstitutionMain_ctl04"]/div/table[5]/tbody/tr[2]/td[2]/text()')
        SAT75_math = admi_dom.xpath('//*[@id="divctl00_cphCollegeNavBody_ucInstitutionMain_ctl04"]/div/table[5]/tbody/tr[2]/td[3]/text()')
        ACT25_composite = admi_dom.xpath('//*[@id="divctl00_cphCollegeNavBody_ucInstitutionMain_ctl04"]/div/table[5]/tbody/tr[3]/td[2]/text()')
        ACT75_composite = admi_dom.xpath('//*[@id="divctl00_cphCollegeNavBody_ucInstitutionMain_ctl04"]/div/table[5]/tbody/tr[3]/td[3]/text()')
        ACT25_english = admi_dom.xpath('//*[@id="divctl00_cphCollegeNavBody_ucInstitutionMain_ctl04"]/div/table[5]/tbody/tr[4]/td[2]/text()')
        ACT75_english = admi_dom.xpath('//*[@id="divctl00_cphCollegeNavBody_ucInstitutionMain_ctl04"]/div/table[5]/tbody/tr[4]/td[3]/text()')
        ACT25_math = admi_dom.xpath('//*[@id="divctl00_cphCollegeNavBody_ucInstitutionMain_ctl04"]/div/table[5]/tbody/tr[5]/td[2]/text()')
        ACT75_math = admi_dom.xpath('//*[@id="divctl00_cphCollegeNavBody_ucInstitutionMain_ctl04"]/div/table[5]/tbody/tr[5]/td[3]/text()')
        SAT_25_50_75 = SAT_clean(SAT25_writing, SAT75_writing, SAT25_math, SAT75_math)
        ACT_25_50_75 = ACT_clean(ACT25_composite, ACT75_composite, ACT25_english, ACT75_english, ACT25_math, ACT75_math)
#         print(SAT_25_50_75)
#         print(ACT_25_50_75)
        my_dict = dict( UNITID = UNITID,
                       schoolname = basicInfo[0],
                       address = basicInfo[1],
                       undergraduateStudentsCount = str(undergraduate[0]) if len(undergraduate) == 1 else 'NaN',
                       graduateStudentsCount = str(graduate[0]) if len(graduate) == 1 else 'NaN',
                       totalStudentsCount = str(total_students[0]) if len(total_students) == 1 else 'NaN',
                       undergraduateGenderMaleFraction = str(gender[0]) if len(gender) == 2 else 'NaN',
                       undergraduateGenderFemaleFraction = str(gender[1]) if len(gender) == 2 else 'NaN',
                       undergraduateRaceWhiteFraction = str(races[0]),
                       undergraduateRaceNonWhiteFraction = str(races[1]),
                       undergraduateRaceAsianFraction = str(races[2]),
                       undergraduateRaceBlackFraction = str(races[3]),
                       undergraduateRaceNonresidentAlienFraction = str(races[4]),
                       undergraduateRaceHispanicFraction = str(races[5]),
                       undergraduateRaceOtherFraction = str(races[6]),
                       admittedSAT25Percentile = str(SAT_25_50_75[0]),
                       admittedSAT50Percentile = str(SAT_25_50_75[1]),
                       admittedSAT75Percentile = str(SAT_25_50_75[2]),
                       admittedACTCombined25Percentile = str(ACT_25_50_75[0]),
                       admittedACTCombined50Percentile = str(ACT_25_50_75[1]),
                       admittedACTCombined75Percentile = str(ACT_25_50_75[2]))
        return my_dict        
    except:
        UNITID = tempId
        my_dict = dict( UNITID = UNITID )
        return my_dict
        
#test
# getDataFromPage(243744)
# getDataFromPage(100858)


def scrape_main(school):
    errors = []
    # count = 20
    for i in trange(len(school)): 
        time.sleep(1)
        # count = count - 1
        # if count<= 0:
        #     break
        if np.isnan(school['UNITID'][i]):
            continue
        else:
            tempId = int(school['UNITID'][i])
            res_dict = getDataFromPage(tempId)
           
            if len(res_dict) < 21:
#                 print('-1')
                errors.append(res_dict['UNITID'])
                continue
            else:
                school.loc[i,'schoolname'] = res_dict['schoolname'] if res_dict['schoolname'] != 'NaN' else np.nan
                school.loc[i,'address'] = res_dict['address'] if res_dict['address'] != 'NaN' else np.nan
                school.loc[i,'undergraduateStudentsCount'] = res_dict['undergraduateStudentsCount'] if res_dict['undergraduateStudentsCount'] != 'NaN' else np.nan
                school.loc[i,'graduateStudentsCount'] = res_dict['graduateStudentsCount'] if res_dict['graduateStudentsCount'] != 'NaN' else np.nan
                school.loc[i,'totalStudentsCount'] = res_dict['totalStudentsCount'] if res_dict['totalStudentsCount'] != 'NaN' else np.nan
                school.loc[i,'undergraduateGenderMaleFraction'] = res_dict['undergraduateGenderMaleFraction'] if res_dict['undergraduateGenderMaleFraction'] != 'NaN' else np.nan
                school.loc[i,'undergraduateGenderFemaleFraction'] = res_dict['undergraduateGenderFemaleFraction'] if res_dict['undergraduateGenderFemaleFraction'] != 'NaN' else np.nan
                school.loc[i,'undergraduateRaceWhiteFraction'] = res_dict['undergraduateRaceWhiteFraction'] if res_dict['undergraduateRaceWhiteFraction'] != 'NaN' else np.nan
                school.loc[i,'undergraduateRaceNonWhiteFraction'] = res_dict['undergraduateRaceNonWhiteFraction'] if res_dict['undergraduateRaceNonWhiteFraction'] != 'NaN' else np.nan
                school.loc[i,'undergraduateRaceAsianFraction'] = res_dict['undergraduateRaceAsianFraction'] if res_dict['undergraduateRaceAsianFraction'] != 'NaN' else np.nan
                school.loc[i,'undergraduateRaceBlackFraction'] = res_dict['undergraduateRaceBlackFraction'] if res_dict['undergraduateRaceBlackFraction'] != 'NaN' else np.nan
                school.loc[i,'undergraduateRaceNonresidentAlienFraction'] = res_dict['undergraduateRaceNonresidentAlienFraction'] if res_dict['undergraduateRaceNonresidentAlienFraction'] != 'NaN' else np.nan
                school.loc[i,'undergraduateRaceHispanicFraction'] = res_dict['undergraduateRaceHispanicFraction'] if res_dict['undergraduateRaceHispanicFraction'] != 'NaN' else np.nan
                school.loc[i,'undergraduateRaceOtherFraction'] = res_dict['undergraduateRaceOtherFraction'] if res_dict['undergraduateRaceOtherFraction'] != 'NaN' else np.nan
                school.loc[i,'admittedSAT25Percentile'] = res_dict['admittedSAT25Percentile'] if res_dict['admittedSAT25Percentile'] != 'NaN' else np.nan
                school.loc[i,'admittedSAT50Percentile'] = res_dict['admittedSAT50Percentile'] if res_dict['admittedSAT50Percentile'] != 'NaN' else np.nan
                school.loc[i,'admittedSAT75Percentile'] = res_dict['admittedSAT75Percentile'] if res_dict['admittedSAT75Percentile'] != 'NaN' else np.nan
                school.loc[i,'admittedACTCombined25Percentile'] = res_dict['admittedACTCombined25Percentile'] if res_dict['admittedACTCombined25Percentile'] != 'NaN' else np.nan
                school.loc[i,'admittedACTCombined50Percentile'] = res_dict['admittedACTCombined50Percentile'] if res_dict['admittedACTCombined50Percentile'] != 'NaN' else np.nan
                school.loc[i,'admittedACTCombined75Percentile'] = res_dict['admittedACTCombined75Percentile'] if res_dict['admittedACTCombined75Percentile'] != 'NaN' else np.nan
                # print('1')
    return errors



def get_UNITID():
    UNITID_table = pd.read_csv('./EE629/data-scrape/unitid.csv')
    return UNITID_table



def main():
    school = get_UNITID()
    print(school)
    # res = getDataFromPage(243744)
    # print(res)
    error = scrape_main(school)
    school.to_csv('./EE629/data-scrape/schools.csv', index = False)
    print('finished!')

    
    
if __name__ == '__main__':
    main()