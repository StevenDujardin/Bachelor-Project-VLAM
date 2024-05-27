import requests
import math
import re
from bs4 import BeautifulSoup
import psycopg2
from dotenv import dotenv_values

secrets = dotenv_values(".env")


def scrape_recipes(url):
    # Send a GET request to the URL
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.text, 'html.parser')
        number = soup.find_all('h2', class_='h4')[1].findChildren('span')[0].text
        times = (math.ceil(int(number)/15))+1
        ingredients = set()
        for time in range(1, times, 1):
            response = requests.get(url + "?page=" + str(time))
            soup = BeautifulSoup(response.text, 'html.parser')
            # Find all the recipe links on the page
            recipe_links = soup.find_all('article', class_='teaser-recipe')
            
            # Extract recipe titles = set()and URLs
            
            for link in recipe_links:
                el = link.contents[1].contents[1].contents[3]
                
                if "teaser-recipe__img__category" in el.get("class") and el.text.strip()== "100% van bij ons":
                    recipe_url = link.findChildren('a', href=True)[0]['href']
                    resp = requests.get(recipe_url)
                    if resp.status_code == 200:
                        print(f"Scraping page {time} of {times-1}: {recipe_url}")
                        soup = BeautifulSoup(resp.text, 'html.parser')
                        recipe_ingredient_list = soup.find('div', class_='recipe-ingredients').findChildren('div')[0].findChildren('ul')
                        for l in recipe_ingredient_list:
                            for i in l.findChildren('li'):
                                pattern = r'\s\(.*?\)'
                                ing = re.sub(pattern, '', i.findChildren('label')[0].text).strip()
                                ing = re.sub(r'^[0-9\,]+\s[a-z]*\s', '', ing)
                                ing = re.sub(r'^[0-9\,]+\s', '', ing)
                                ing = re.sub('\'s', '', ing)
                                ingredients.add(ing)
        return ingredients
    else:
        print("Failed to fetch page:", response.status_code)


# URL of the website to scrape
url = "https://www.lekkervanbijons.be/recepten"

# Scrape recipes
recipes = scrape_recipes(url)

#Write recipes to a file
if recipes:
    conn = psycopg2.connect(
    dbname=secrets['DB_NAME'],
    user= secrets['DB_USER'],
    password = secrets['DB_PASSWORD'],
    host= secrets['DB_HOST'],
    port= secrets['DB_PORT']
)

    cur = conn.cursor()
    truncate_query = 'truncate table ingredienten restart identity cascade'
    insert_query = 'insert into ingredienten (naam) values (%s)'
    try:
        cur.execute(truncate_query)
        for item in recipes:
            cur.execute(insert_query, (item,))
        conn.commit()
    except Exception as e:
        print(f"Ann error occurred: {e}")
        conn.rollback()
    finally:
        cur.close()
        conn.close()
else:
    print("No recipes found")

