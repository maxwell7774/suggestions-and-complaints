import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "User" }).click();
  await page.getByRole("tab", { name: "Complaint" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Recipients$/ })
    .locator("div")
    .nth(1)
    .click();
  await page.getByRole("option", { name: "Adam Maxwell" }).click();
  await page.getByRole("option", { name: "Stitch" }).click();
  await page.getByPlaceholder("Please write your subject").click();
  await page
    .getByPlaceholder("Please write your subject")
    .fill("Playwright Testing Complaint");
  await page.getByPlaceholder("Please write your message").click();
  await page
    .getByPlaceholder("Please write your message")
    .fill("This complaint is a test written by playwright.");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("heading", { name: "Thank you. Your message has" })
  ).toBeVisible();
});
