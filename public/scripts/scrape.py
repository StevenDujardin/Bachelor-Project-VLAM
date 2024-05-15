import requests
from bs4 import BeautifulSoup

def scrape_recipes(url):
    # Send a GET request to the URL
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all the recipe links on the page
        recipe_links = soup.find_all('article', class_='teaser-recipe')
        # Extract recipe titles and URLs
        recipes = []
        for link in recipe_links:
            recipe_title = link.text.strip()
            recipe_url = link.findChildren('a', href=True)[0]['href']
            print(recipe_url)
            recipes.append({'title': recipe_title})

        return recipes
    else:
        print("Failed to fetch page:", response.status_code)


# URL of the website to scrape
url = "https://www.lekkervanbijons.be/recepten"

# Scrape recipes
recipes = scrape_recipes(url)

#Write recipes to a file
if recipes:
    for recipe in recipes:
        file = open("recipes_urls.txt", 'a')
        file.write(recipe['title'])
        #file.write(recipe['url'])
        file.close()
else:
    print("No recipes found")

