# Backend

This folder contains the FastAPI backend for the project.

## Setup
1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
2. Activate the virtual environment:
   - Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn
   ```
4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

## Project Structure
- `main.py`: FastAPI entry point
- `app/`: Application code (routers, models, etc.)
