import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "User" }).click();
  await expect(
    page.getByRole("heading", { name: "Write your suggestion here" })
  ).toBeVisible();
  await page.getByRole("tab", { name: "Suggestion" }).click();
  await page.getByPlaceholder("Select your recipients here...").click();
  await page.getByRole("option", { name: "Joe (Reviewer)" }).click();
  await page.getByRole("option", { name: "Bobio (Admin)" }).click();
  await page.getByPlaceholder("Please write your subject").click();
  await page
    .getByPlaceholder("Please write your subject")
    .fill("(Playwright Test) This is a test suggestion!");
  await page.getByPlaceholder("Please write your message").click();
  await page
    .getByPlaceholder("Please write your message")
    .fill("(Playwright Test) This is the test suggestion body!");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("heading", { name: "Thank you. Your message has" })
  ).toBeVisible();
  await page.getByRole("link", { name: "User" }).click();
  await page.getByRole("tab", { name: "Complaint" }).click();
  await page.getByPlaceholder("Select your recipients here...").click();
  await page.getByRole("option", { name: "Joe (Reviewer)" }).click();
  await page.getByRole("option", { name: "Bobio (Admin)" }).click();
  await page.getByPlaceholder("Please write your subject").click();
  await page
    .getByPlaceholder("Please write your subject")
    .fill("(Playwright Test) This is a test complaint!");
  await page.getByPlaceholder("Please write your subject").press("Tab");
  await page
    .getByPlaceholder("Please write your message")
    .fill("(Playwright Test) This is the body of the test complaint!");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("heading", { name: "Thank you. Your message has" })
  ).toBeVisible();
});
