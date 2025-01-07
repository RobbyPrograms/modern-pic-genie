import tkinter as tk
from tkinter import messagebox
from ui import create_ui
from utils import generate_image

def main():
    root = tk.Tk()
    root.title("AI Image Generator")
    create_ui(root)
    root.mainloop()

if __name__ == "__main__":
    main()