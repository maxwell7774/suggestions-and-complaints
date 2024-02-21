import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Reviewer" }).click();
  await page
    .getByRole("link", { name: "(Playwright Test) This is a test suggestion!" })
    .click();
  await page.getByPlaceholder("Make your comment here...").click();
  await page
    .getByPlaceholder("Make your comment here...")
    .fill("(Playwright Test) This is a test comment.");
  await page.getByRole("button", { name: "Add Comment" }).click();
  await expect(page.getByText(": (Playwright Test) This is a")).toBeVisible();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByPlaceholder("Please enter your comment...").click();
  await page
    .getByPlaceholder("Please enter your comment...")
    .fill("(Playwright Test) This comment was edited.");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(page.getByText(": (Playwright Test) This")).toBeVisible();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
});
