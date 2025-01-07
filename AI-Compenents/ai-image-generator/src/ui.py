import ttkbootstrap as ttk
from ttkbootstrap.constants import *
from tkinter import messagebox, filedialog
from PIL import Image, ImageTk
from utils import generate_image, load_image

def create_ui(root):
    root.geometry("800x600")  # Set the initial size of the window
    root.title("AI Image Generator")

    style = ttk.Style("cosmo")  # You can choose other themes like 'flatly', 'darkly', etc.

    # Main frame
    main_frame = ttk.Frame(root, padding=20)
    main_frame.grid(row=0, column=0, sticky="nsew")

    root.grid_rowconfigure(0, weight=1)
    root.grid_columnconfigure(0, weight=1)

    # Prompt entry
    prompt_label = ttk.Label(main_frame, text="Enter your prompt:", font=("Helvetica", 14))
    prompt_label.grid(row=0, column=0, columnspan=2, pady=10)

    prompt_entry = ttk.Entry(main_frame, width=50, font=("Helvetica", 12))
    prompt_entry.grid(row=1, column=0, columnspan=2, pady=10)

    # Width and height entries
    width_height_frame = ttk.Frame(main_frame)
    width_height_frame.grid(row=2, column=0, columnspan=2, pady=10)

    width_label = ttk.Label(width_height_frame, text="Width:", font=("Helvetica", 12))
    width_label.grid(row=0, column=0, padx=5)

    width_entry = ttk.Entry(width_height_frame, width=10, font=("Helvetica", 12))
    width_entry.grid(row=0, column=1, padx=5)

    height_label = ttk.Label(width_height_frame, text="Height:", font=("Helvetica", 12))
    height_label.grid(row=0, column=2, padx=5)

    height_entry = ttk.Entry(width_height_frame, width=10, font=("Helvetica", 12))
    height_entry.grid(row=0, column=3, padx=5)

    # Image display area
    canvas_frame = ttk.Frame(main_frame)
    canvas_frame.grid(row=3, column=0, columnspan=2, pady=10, sticky="nsew")

    main_frame.grid_rowconfigure(3, weight=1)
    main_frame.grid_columnconfigure(0, weight=1)

    canvas = ttk.Canvas(canvas_frame)
    canvas.pack(side=LEFT, fill=BOTH, expand=True)

    scrollbar = ttk.Scrollbar(canvas_frame, orient=VERTICAL, command=canvas.yview)
    scrollbar.pack(side=RIGHT, fill=Y)

    canvas.configure(yscrollcommand=scrollbar.set)
    canvas.bind('<Configure>', lambda e: canvas.configure(scrollregion=canvas.bbox('all')))

    frame = ttk.Frame(canvas)
    canvas.create_window((0, 0), window=frame, anchor='nw')

    image_label = ttk.Label(frame)
    image_label.pack(pady=10)

    # Generate and Save buttons
    button_frame = ttk.Frame(main_frame)
    button_frame.grid(row=4, column=0, columnspan=2, pady=10)

    def on_generate():
        prompt = prompt_entry.get()
        width = width_entry.get()
        height = height_entry.get()
        try:
            file_path = generate_image(prompt, width, height)
            display_image(file_path, width, height)
        except Exception as e:
            messagebox.showerror("Error", str(e))

    def display_image(file_path, width, height):
        img = load_image(file_path, width, height)
        img = ImageTk.PhotoImage(img)
        image_label.config(image=img)
        image_label.image = img
        # Center the image label within the frame
        image_label.pack(pady=10, expand=True)

    def on_save():
        file_path = filedialog.asksaveasfilename(defaultextension=".png", filetypes=[("PNG files", "*.png"), ("All files", "*.*")])
        if file_path:
            img = image_label.image._PhotoImage__photo  # Get the PhotoImage object
            img.write(file_path, format="png")

    generate_button = ttk.Button(button_frame, text="Generate Image", command=on_generate, bootstyle=SUCCESS)
    generate_button.grid(row=0, column=0, padx=10)

    save_button = ttk.Button(button_frame, text="Save Image", command=on_save, bootstyle=PRIMARY)
    save_button.grid(row=0, column=1, padx=10)