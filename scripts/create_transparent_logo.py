from PIL import Image
import requests
from io import BytesIO

# Preuzmi originalnu sliku
url = "/images/logo.png"
response = requests.get(url)
img = Image.open(BytesIO(response.content))

# Konvertuj u RGBA ako nije
if img.mode != 'RGBA':
    img = img.convert('RGBA')

# Pretvori bijelu pozadinu (255, 255, 255) u transparentnu
data = img.getdata()
new_data = []

for item in data:
    # Ako je pikselo bijel (R=255, G=255, B=255), učini ga transparentnim
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        new_data.append((255, 255, 255, 0))  # Transparentan
    else:
        new_data.append(item)

img.putdata(new_data)

# Spremi kao PNG sa transparentnom pozadinom
img.save('public/logo.png', 'PNG')
print("[v0] Logo sa transparentnom pozadinom je kreiran!")
