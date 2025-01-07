import os
import requests
from PIL import Image
from io import BytesIO

def generate_image(prompt, width=None, height=None):
    url = f"https://image.pollinations.ai/prompt/{prompt}"
    if width and height:
        url += f"?width={width}&height={height}"
    response = requests.get(url)
    
    if response.status_code == 200:
        image = Image.open(BytesIO(response.content))
        os.makedirs("generated_images", exist_ok=True)
        file_path = os.path.join("generated_images", "generated_image.png")
        image.save(file_path)
        return file_path
    else:
        raise Exception("Failed to generate image")

def load_image(file_path, width=None, height=None):
    img = Image.open(file_path)
    # Crop the image to remove the watermark (assuming the watermark is at the bottom right corner)
    cropped_img = img.crop((0, 0, img.width, img.height - 50))  # Adjust the crop area as needed
    if width and height:
        cropped_img = cropped_img.resize((int(width), int(height)), Image.LANCZOS)
    return cropped_img