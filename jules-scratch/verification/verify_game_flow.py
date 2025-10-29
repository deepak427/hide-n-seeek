import re
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Shared URL storage
    game_url = ""

    # Define a handler for the prompt dialog
    def handle_dialog(dialog):
        nonlocal game_url
        if dialog.type == "prompt":
            print(f"Prompt message: {dialog.message}")
            game_url = dialog.message.split("!")[1].strip()
            dialog.accept()

    page.on("dialog", handle_dialog)

    try:
        # Step 1: Create a game
        page.goto("http://localhost:65010", timeout=60000)
        page.wait_for_selector("#game-container")
        page.get_by_role("button", name="Map 1").click()
        page.locator('canvas').click(position={'x': 100, 'y': 100}) # Click the "tree"
        page.get_by_text("Share").click()

        # At this point, the dialog handler should have captured the URL.
        # We need to wait for the event to be processed.
        page.wait_for_timeout(1000) # Simple wait, might need adjustment

        if not game_url:
            raise Exception("Failed to capture game URL from prompt.")

        print(f"Captured game URL: {game_url}")

        # Step 2: Navigate to the game URL for guessing
        page.goto(game_url)
        page.wait_for_selector("canvas") # Wait for the game to load

        # Step 3: Make a guess and take a screenshot
        page.locator('canvas').click(position={'x': 200, 'y': 200}) # Click the "box" (wrong guess)
        page.screenshot(path="jules-scratch/verification/wrong_guess.png")

        page.locator('canvas').click(position={'x': 100, 'y': 100}) # Click the "tree" (correct guess)
        page.wait_for_timeout(1000) # Wait for scene change
        page.screenshot(path="jules-scratch/verification/correct_guess.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
