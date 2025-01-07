# AI Image Generator

This project is an AI image generator application that allows users to create images based on textual prompts using a graphical user interface (GUI). The application utilizes a pre-trained Stable Diffusion model to generate images.

## Project Structure

```
ai-image-generator
├── src
│   ├── main.py        # Entry point of the application
│   ├── ui.py          # GUI layout and event handling
│   └── utils.py       # Utility functions for image generation
├── requirements.txt    # Project dependencies
└── README.md           # Project documentation
```

## Requirements

To run this project, you need to install the following dependencies:

- tkinter
- Pillow
- torch
- diffusers

You can install the required packages using pip. Create a virtual environment and run:

```
pip install -r requirements.txt
```

## Usage

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ai-image-generator
   ```

2. Install the required dependencies as mentioned above.

3. Run the application:
   ```
   python src/main.py
   ```

4. Enter a prompt in the text entry field and click the "Generate" button to create an image based on your prompt.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.